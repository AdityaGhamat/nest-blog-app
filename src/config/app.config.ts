import { registerAs } from '@nestjs/config';
export default registerAs('appConfig', () => ({
  environment: process.env.NODE_ENV || 'production',
  apiVersion: process.env.API_VERSION,
  awsBucketName: process.env.AWS_PUBLIC_BUCKET_NAME,
  awsRegion: process.env.AWS_REGION,
  awsCloudFrontUrl: process.env.AWS_CLOUDFRONT_URL,
  awsAccessKey: process.env.AWS_ACCESS_KEY,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  nodemailer_host: process.env.NODEMAILER_EMAIL_HOST,
  nodemailer_port: process.env.NODEMAILER_EMAIL_PORT,
  nodemailer_user: process.env.NODEMAILER_EMAIL_USER,
  nodemailer_password: process.env.NODEMAILER_EMAIL_PASSWORD,
}));
