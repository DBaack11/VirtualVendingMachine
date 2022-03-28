from django.db import models


# Represents a Soda object using models.Model
class Soda(models.Model):
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    cost = models.DecimalField(max_digits=5, decimal_places=2)
    available_quantity = models.IntegerField()

    def __str__(self):
        return self.name
