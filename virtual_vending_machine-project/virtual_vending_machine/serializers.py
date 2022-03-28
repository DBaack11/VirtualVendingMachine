from rest_framework import serializers
from .models import Soda


# Serializer class that takes in data and converts it to either a Soda object or JSON
class SodaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Soda
        fields = ['id', 'name', 'description', 'cost', 'available_quantity']
