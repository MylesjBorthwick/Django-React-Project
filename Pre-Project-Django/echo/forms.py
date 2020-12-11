from django import forms
from .models import Echo

class EchoForm(forms.ModelForm):
    class Meta:
        model = Echo
        fields = [
            'message'
        ]




class RawEchoForm(forms.Form):
    message = forms.CharField(widget= forms.TextInput(attrs={"placeholder":"Your message"}))
    # attrs={"placeholder":"Your message"}

