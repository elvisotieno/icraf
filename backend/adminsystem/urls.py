from django.urls import path
from .views import registerUser, user_detail, MyTokenObtainPairView
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


app_name = 'adminsystem'

urlpatterns = [
    path('register/', registerUser),
    path('user-detail/<int:pk>/', user_detail),
    path('login/', obtain_auth_token, name='login'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]