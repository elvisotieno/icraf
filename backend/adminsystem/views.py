from django.shortcuts import render
from django.contrib.auth.models import User

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


from .serializers import OurUserSerializer
from .models import OurUser


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)


        token['username'] = user.username


        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# Creating users into our db
@api_view(['POST', 'GET'])
def registerUser(request,):
    if request.method =='GET':
        all_users= OurUser.objects.all()
        serializer=OurUserSerializer(all_users, many=True)
        return Response(serializer.data)
    elif request.method =='POST':
        serializer = OurUserSerializer(data=request.data)
        data ={}
        if serializer.is_valid():
            account = serializer.cutom_save()
            data['response'] = 'new user was successfully registered'
            data['email'] = account.email
            data['username'] = account.username
            token = Token.objects.get(user=account).key
            data['token'] = token
        else:
            data = serializer.errors
        return Response(data)


# Get, Update and delete particular user details
@api_view(['GET','PUT','DELETE'])
def user_detail(request, pk):
    # First let's check if the disease exist
    try:
        specific_user = OurUser.objects.get(pk=pk)

    except OurUser.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method =='GET':
        serializer = OurUserSerializer(specific_user)
        return Response(serializer.data)

    elif request.method =='PUT':
        serializer = OurUserSerializer(instance=specific_user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        specific_user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


