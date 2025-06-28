from django.core.management.base import BaseCommand
from django.utils.crypto import get_random_string
from chatapp.models import AppUser

class Command(BaseCommand):
	def handle(self, *args, **options):
		email = 'mo.zeggaf@gmail.com'
		password = get_random_string(10)
		try:
			if not AppUser.objects.filter(is_superuser=True).exists():
				AppUser.objects.create_superuser(username='admin', email=email, password=password)
				self.stdout.write(self.style.SUCCESS('==========================================='))
				self.stdout.write(self.style.SUCCESS('Superuser created successfully!'))
				self.stdout.write((f'Email: {email}'))
				self.stdout.write((f'Password: {password}'))
				self.stdout.write(self.style.SUCCESS('==========================================='))
			else:
				self.stdout.write(self.style.SUCCESS('Superuser already exists'))
		except Exception as e:
			self.stdout.write(self.style.ERROR(f'Error creating superuser: {e}'))
