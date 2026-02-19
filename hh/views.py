from urllib import request
from django.shortcuts import get_object_or_404, render
from hh.rag import process_input
from hh.models import Message
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from hh.models import Message, Sim
import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

def home(request):
    sim=Sim.objects.all()
    return render(request, 'index.html', {'sim': sim})

def mail(request):
    return render(request, 'mail.html')

def works(request):
    return render(request, 'role.html')

def register(request):
    return render(request, 'register.html')
 
def teams(request):
    return render(request, 'teams.html')

def ide(request):
    return render(request, 'IDE.html')

def login(request):
    return render(request, 'login.html')

""" def save_message(request):
    if request.method == 'POST':
        message = request.POST.get('mbox') 
        Message.objects.create(content=message)
        res=process_input(message)
        return render(request, 'teams.html', {'mbox': message, 'response': res}) """

def chat_page(request):
    messages = Message.objects.all().order_by("created_at")
    return render(request, "teams.html", {"messages": messages})
 

@require_POST
def save_message(request):
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        message = request.POST.get('mbox')
        chat_id = request.POST.get('chat_id', 'sarah')
        
        Message.objects.create(content=message)        
        llm_response = process_input(message)
        return JsonResponse({
            'status': 'success',
            'response': llm_response,
            'chat_id': chat_id
        })
    else:
        message = request.POST.get('mbox')
        chat_id = request.POST.get('chat_id', 'sarah')
        Message.objects.create(content=message)
        llm_response = process_input(message)
        return render(request, 'teams.html', {
            'response': llm_response,
            'active_chat': chat_id
        })

def chat_page(request):
    messages = Message.objects.all().order_by("created_at")
    return render(request, "teams.html", {"messages": messages})

def sim(request):
    # Retrieve simulation data from session
    simulation_data = request.session.get('simulation_data', {})
    
    role_id = simulation_data.get('role_id')
    role_name = simulation_data.get('role_name')
    level = simulation_data.get('level')
    language = simulation_data.get('language')
    
    # You can also get Sim object if needed
    try:
        sim_object = Sim.objects.get(id=role_id) if role_id else None
    except Sim.DoesNotExist:
        sim_object = None
    
    return render(request, 'tt.html', {
        'role_id': role_id,
        'role_name': role_name,
        'level': level,
        'language': language,
        'sim_object': sim_object
    })

def begin(request):
    return render(request, 'welcome.html')  

def roles(request):
    return render(request, 'role.html')

def result(request):
    return render(request, 'result.html')

@csrf_exempt
@require_POST
def trial(request):
    try:
        # Check if it's an AJAX request
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            # Parse JSON data
            data = json.loads(request.body)
            
            role_id = data.get('role_id')
            role_name = data.get('role_name')
            level = data.get('level')
            language = data.get('language')
            
            # Define roles that should go to tt.html
            frontend_roles = ['Frontend Developer', 'Backend Developer', 'Data Analyst']
            
            # Store in session for later use if needed
            request.session['simulation_data'] = {
                'role_id': role_id,
                'role_name': role_name,
                'level': level,
                'language': language
            }
            
            # Return JSON response with redirect info
            return JsonResponse({
                'status': 'success',
                'message': 'Simulation started successfully',
                'role_name': role_name,
                'redirect_to': 'sim' if role_name in frontend_roles else f'simulation/{role_id}'
            })
        
        # Handle non-AJAX POST requests (fallback)
        else:
            role_id = request.POST.get('role_id')
            role_name = request.POST.get('role_name')
            level = request.POST.get('level')
            language = request.POST.get('language')
            
            # Store in session
            request.session['simulation_data'] = {
                'role_id': role_id,
                'role_name': role_name,
                'level': level,
                'language': language
            }
            
            # Define roles that should go to tt.html
            frontend_roles = ['Frontend Developer', 'Backend Developer', 'Data Analyst']
            
            if role_name in frontend_roles:
                return render(request, 'tt.html', {
                    'role_id': role_id,
                    'role_name': role_name,
                    'level': level,
                    'language': language
                })
            else:
                return render(request, f'{role_name.lower().replace(" ", "_")}.html', {
                    'role_id': role_id,
                    'role_name': role_name,
                    'level': level,
                    'language': language
                })
                
    except json.JSONDecodeError:
        return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    

