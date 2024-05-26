import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .views import save_message

class ChatConsumer(WebsocketConsumer):
	def connect(self):
		self.chatroom_id = "chat-kkk"
		async_to_sync(self.channel_layer.group_add)(
			self.chatroom_id,
			self.channel_name
		)

		self.accept()

		self.send(text_data=json.dumps({
			"ok": True,
			"detail": "connection established"
		}))

	def receive(self, text_data=None, bytes_data=None):
		msg = json.loads(text_data)
		saved = save_message(msg)
		if saved["ok"] is False:
			self.send(text_data=saved["detail"])
		else:
			async_to_sync(self.channel_layer.group_send)(
				self.chatroom_id,
				{
					"type": "send_message",
					"message": saved["message"]
				}
			)

	def send_message(self, event):
		msg = event["message"]
		self.send(text_data=json.dumps(msg))
