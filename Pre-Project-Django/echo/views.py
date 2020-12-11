from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from .forms import EchoForm, RawEchoForm
from echo.models import Echo

# Create your views here.
def echo_view(*args, **kwargs):
    return HttpResponse("<h1>Please go to /api/echos/<h1>")

def echo_dynamic_lookup_view(request, id):
    obj = get_object_or_404(Echo,id=id)
    form = RawEchoForm()
    if request.method == 'POST':
        form = RawEchoForm(request.POST)
        if form.is_valid():
            print(form.cleaned_data)
            obj.message = form.cleaned_data['message']
            obj.save()
            form = RawEchoForm()  
        else:
            obj.delete()
            return redirect('/api/echos/')


    context = {'object':obj,
                'form':form, 
}
    return render(request,"one_echo.html",context)


def echo_response_view(request, *args, **kwargs):
    #print(request.GET())
    #print(request.POST())
    #.objects.create()

    form = RawEchoForm()
    if request.method == 'POST':
        form = RawEchoForm(request.POST)
        if form.is_valid():
            print(form.cleaned_data)
            #form.save()
            Echo.objects.create(**form.cleaned_data)
            form = RawEchoForm()
        else:
            print(form.errors)
    
   

    context = {
        "form": form,
        "list": Echo.objects.all(),
    }
    
    return render(request, "echo.html",context)
    '''   
    context = {
        "form": form,
        "list": ["a string","another string"]
    }

    return render(request, "echo.html",context)



    form = RawEchoForm()
    if request.method == 'POST':
        form = RawEchoForm(request.POST)
        if form.is_valid():
            print(form.cleaned_data)
            #form.save()
            Echo.objects.create(**form.cleaned_data)
            form = EchoForm()
        else:
            print(form.errors)

    context = {
        "form": form,
        "list": ["a string","another string"]
    }

    if request.method == 'GET':
        context['search'] = 'Found String!'
    
    return render(request, "echo.html",context)
    '''