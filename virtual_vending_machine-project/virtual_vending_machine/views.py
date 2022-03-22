from django.http import JsonResponse
from .models import Soda
from .serializers import SodaSerializer


def soda_list(request):
    sodas = Soda.objects.all()
    serializer = SodaSerializer(sodas, many=True)
    return JsonResponse({'sodas': serializer.data}, safe=False)
