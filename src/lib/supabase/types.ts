// Hand-written to match supabase/migrations/20260720120000_create_rsvps.sql.
// Regenerate/replace with `supabase gen types typescript` once the project
// is linked, so this stays in sync automatically instead of by hand.
export interface Database {
  public: {
    Tables: {
      rsvps: {
        Row: {
          id: string;
          full_name: string;
          attending: boolean;
          party_size: number;
          email: string | null;
          phone: string | null;
          dietary_notes: string | null;
          message: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          attending: boolean;
          party_size?: number;
          email?: string | null;
          phone?: string | null;
          dietary_notes?: string | null;
          message?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["rsvps"]["Insert"]>;
      };
    };
  };
}
