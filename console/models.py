from django.db import models
import allauth.socialaccount.models as authmodels

#print(dir(authmodels))

class SavedProgram(models.Model):
    user = models.ForeignKey(authmodels.get_user_model(), on_delete=models.SET_NULL, null=True)
    script = models.TextField(null=True)
    name = models.TextField()
    class Meta:
        unique_together=('user', 'name')

