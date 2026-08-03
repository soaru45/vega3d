import os
import pika
import json
from dotenv import load_dotenv

load_dotenv()

def main():
    print("🚀 AI Orchestrator Worker is starting...")
    rabbitmq_url = os.getenv("RABBITMQ_URL", "amqp://guest:guest@localhost:5672/")
    try:
        parameters = pika.URLParameters(rabbitmq_url)
        connection = pika.BlockingConnection(parameters)
        channel = connection.channel()
        
        # Declare the queue
        queue_name = 'generation_tasks'
        channel.queue_declare(queue=queue_name, durable=True)
        
        print(f"[*] Waiting for messages in {queue_name}. To exit press CTRL+C")
        
        def callback(ch, method, properties, body):
            payload = json.loads(body)
            print(f" [x] Received generation task: {payload}")
            # Simulate work
            print(" [x] Done")
            ch.basic_ack(delivery_tag=method.delivery_tag)
            
        channel.basic_qos(prefetch_count=1)
        channel.basic_consume(queue=queue_name, on_message_callback=callback)
        
        channel.start_consuming()
    except Exception as e:
        print(f"Failed to connect to RabbitMQ: {e}")

if __name__ == '__main__':
    main()
