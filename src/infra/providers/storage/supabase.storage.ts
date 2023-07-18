import { FileDTO } from '@/modules/users/dtos';
import { IStorage } from './storage';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SupabaseStorage implements IStorage {
  private client: SupabaseClient;

  constructor(private config: ConfigService) {
    this.client = createClient(
      this.config.get<string>('SUPABASE_URL') ?? '',
      this.config.get<string>('SUPABASE_KEY') ?? '',
    );
  }

  async upload(file: FileDTO, folder: string): Promise<any> {
    const data = await this.client.storage
      .from(this.config.get<string>('SUPABASE_BUCKET_NAME') ?? '')
      .upload(`${folder}/${file.filename}`, file.buffer, {
        upsert: true,
      });

    return data;
  }
}
