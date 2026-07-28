// Hand-written to match
// supabase/migrations/20260720120000_create_guests_and_rsvps.sql.
// Regenerate/replace with `supabase gen types typescript` once the project
// is linked, so this stays in sync automatically instead of by hand.
export interface Database {
  public: {
    Tables: {
      guests: {
        Row: {
          id: string;
          invite_code: string;
          full_name: string;
          max_party_size: number;
          rsvp_status: "pending" | "attending" | "declined";
          responded_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          invite_code: string;
          full_name: string;
          max_party_size?: number;
          rsvp_status?: "pending" | "attending" | "declined";
          responded_at?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["guests"]["Insert"]>;
        Relationships: [];
      };
      rsvps: {
        Row: {
          id: string;
          guest_id: string;
          attending: boolean;
          party_size: number;
          dietary_notes: string | null;
          message: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          guest_id: string;
          attending: boolean;
          party_size: number;
          dietary_notes?: string | null;
          message?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["rsvps"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}
