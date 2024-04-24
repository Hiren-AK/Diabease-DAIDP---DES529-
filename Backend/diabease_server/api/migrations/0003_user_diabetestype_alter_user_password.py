# Generated by Django 5.0.4 on 2024-04-24 16:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_user_allergies_user_height_user_weight'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='diabetesType',
            field=models.CharField(blank=True, choices=[('type1', 'Type 1'), ('type2', 'Type 2'), ('prediabetes', 'Prediabetes'), ('gestational', 'Gestational'), ('none', 'None')], max_length=20),
        ),
        migrations.AlterField(
            model_name='user',
            name='password',
            field=models.CharField(max_length=128),
        ),
    ]