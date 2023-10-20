


declare namespace Express {
  export interface Request {
    user: {
      id
      email: string;
      name: string;
      middle_name: string;
      position: string;
      email_signature: string;
      whatsapp_business: string;
      can_edit_vacancy?: boolean;
      access_profile: AccessProfiles;
      is_active: boolean;
      ip: string;
      sub?: string;
    };
    profile_history: any;
    event: any;
    profile_id: any;
    startTime: Date;
  }
}


