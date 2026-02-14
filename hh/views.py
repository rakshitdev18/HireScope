from urllib import request
from django.shortcuts import render
from hh.rag import process_input
from hh.models import Message
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from hh.models import Message
# Create your views here.
def home(request):
    return render(request, 'index.html')

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

def save_message(request):
    if request.method == 'POST':
        message = request.POST.get('mbox') 
        Message.objects.create(content=message)
        res=process_input(message)
        return render(request, 'teams.html', {'mbox': message, 'response': res})

def chat_page(request):
    messages = Message.objects.all().order_by("created_at")
    return render(request, "teams.html", {"messages": messages})
 

@require_POST
def save_message(request):
    # Check if it's an AJAX request
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        message = request.POST.get('mbox')
        chat_id = request.POST.get('chat_id', 'sarah')
        
        # Save user message
        Message.objects.create(content=message)
        
        # Get LLM response
        llm_response = process_input(message)
        
        # Return JSON response
        return JsonResponse({
            'status': 'success',
            'response': llm_response,
            'chat_id': chat_id
        })
    else:
        # Regular form submission fallback
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
    return render(request, 'tt.html')

def begin(request):
    return render(request, 'welcome.html')  

def roles(request):
    return render(request, 'role.html')

def result(request):
    return render(request, 'result.html')