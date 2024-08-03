from django.shortcuts import render
from django.http import HttpResponse
from django.http import Http404

from datetime import datetime

from .models import User
from .models import Transaction

def home(request):
    users =  User.objects.filter(
        transaction__inventory__status__description='Checked out',
        transaction__checkout_time__lt = datetime(2023,9,3)
    ).select_related('transaction__inventory__status').values(
        'first_name',
        'last_name',
        'transaction__inventory__description',
        'transaction__checkout_time',
        'transaction__inventory__status__description'
    )

    # transactions =  Transaction.objects.all()
    transactions =  Transaction.objects.filter(
        user_id=1,
        inventory__status__description='Checked out'
        ).select_related('inventory__status', 'user').values(
        'user_id',
        'inventory__description',
        'inventory__status__description',
        'checkout_time'
    )
    return render(request, 'home.html', {'users': users, 'transactions': transactions})
