import mongoose from 'mongoose';

export async function setupMongo(): Promise<void> {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }

    console.log('🎲 Connecting to DB...');
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log('✅ DB Connected!');
  } catch {
    throw new Error('❌ DB not connected.');
  }
}
// Para rodar a aplicação o comando é : docker logs devbills-api --follow
