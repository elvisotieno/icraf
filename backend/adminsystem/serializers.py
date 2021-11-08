from rest_framework import serializers
from .models import OurUser


class OurUserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True) #secondary password field
    class Meta:
        model = OurUser
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        } # hiding user password

    #overwriting the save method so we can make sure the two passwords match
    def cutom_save(self):
        account  = OurUser(
            email = self.validated_data['email'],
            username = self.validated_data['username'],
        )
        password = self.validated_data['password']
        password2 = self.validated_data['password']

        if password != password2:
            raise serializers.ValidationError({'password':'Your passwords are not matching'})
        account.set_password(password)
        account.save()
        return account
