from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import generics

from .models import Lead
from .serializers import LeadSerializer


class LeadListCreate(generics.ListCreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer