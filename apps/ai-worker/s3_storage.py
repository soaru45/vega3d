import boto3
import os
from dotenv import load_dotenv

load_dotenv()

class S3Storage:
    def __init__(self):
        self.s3 = boto3.client(
            "s3",
            endpoint_url=os.getenv("S3_ENDPOINT", "http://localhost:9000"),
            aws_access_key_id=os.getenv("S3_ACCESS_KEY", "minioadmin"),
            aws_secret_access_key=os.getenv("S3_SECRET_KEY", "minioadminpassword")
        )
        self.bucket_name = os.getenv("S3_BUCKET", "vega3d-bucket")
        self._ensure_bucket_exists()

    def _ensure_bucket_exists(self):
        try:
            self.s3.head_bucket(Bucket=self.bucket_name)
        except:
            self.s3.create_bucket(Bucket=self.bucket_name)
            # Make bucket public for reading
            bucket_policy = {
                "Version": "2012-10-17",
                "Statement": [
                    {
                        "Sid": "PublicReadGetObject",
                        "Effect": "Allow",
                        "Principal": "*",
                        "Action": ["s3:GetObject"],
                        "Resource": [f"arn:aws:s3:::{self.bucket_name}/*"]
                    }
                ]
            }
            import json
            self.s3.put_bucket_policy(Bucket=self.bucket_name, Policy=json.dumps(bucket_policy))

    def upload_file(self, file_path, object_name):
        self.s3.upload_file(file_path, self.bucket_name, object_name)
        # return public URL
        endpoint = os.getenv("S3_ENDPOINT", "http://localhost:9000")
        return f"{endpoint}/{self.bucket_name}/{object_name}"

