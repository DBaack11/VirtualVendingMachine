from rest_framework import serializers
from .models import Soda


class SodaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Soda
        fields = ['id', 'name', 'description', 'cost', 'available_quantity']
