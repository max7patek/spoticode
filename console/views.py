from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.template import loader
from django.contrib.auth.decorators import login_required
from allauth.socialaccount.models import SocialToken
from django.views.decorators.csrf import csrf_exempt

from console.models import *


def index(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect('/console/login/')
    print(request.user)
    tok = SocialToken.objects.filter(account__user=request.user, account__provider='spotify')[0]
    if 'program' in request.GET:
        current_program = request.GET.get('program')
        current_program = SavedProgram.objects.filter(user=request.user, name=current_program)[0]
    else:
        current_program = None
    template = loader.get_template('console/index.html')
    return HttpResponse(template.render({
        'token': tok,
        'programs': map(lambda i: i.name, SavedProgram.objects.filter(user=request.user)),
        'current_script': current_program.script if current_program is not None else "",
        'current_name': current_program.name if current_program is not None else "default",
    }, request))


def login(request):
    return render(request, 'console/login.html')

@csrf_exempt
def save(request):
    'this is ajax'
    if not request.user.is_authenticated:
        return JsonResponse({
            'error':True,
            'result':'Must be Logged In',
        })
    if not request.method == 'POST':
        return JsonResponse({
            'error':True,
            'result':'Must POST',
        })
    #data = request.POST.data
    script = request.POST.get('script')
    name = request.POST.get('name')
    if SavedProgram.objects.filter(user=request.user, name=name).exists():
        prog = SavedProgram.objects.filter(user=request.user, name=name)[0]
        prog.script = script
        prog.save()
        return JsonResponse({
            'error': False,
            'result':'Updated Saved Program',
        })
    else:
        obj = SavedProgram()
        obj.name = name
        obj.script = script
        obj.user = request.user
        obj.save()
        return JsonResponse({
            'error':False,
            'result':'Created New Save',
        })

# def login_callback(request):
#     pass

