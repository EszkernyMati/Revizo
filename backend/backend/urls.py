from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('zarzadzaj.urls')), # Dołącz adresy z aplikacji accounts
    # ... inne adresy URL ...
]