// Hand-written to match
// supabase/migrations/20260720120000_create_guests_and_rsvps.sql,
// 20260806120000_create_families_and_members.sql, and
// 20260806130000_add_family_rsvp_fields.sql.
// Regenerate/replace with `supabase gen types typescript` once the project
// is linked, so this stays in sync automatically instead of by hand.
export interface Database {
  public: {
    Tables: {
      families: {
        Row: {
          id: string;
          family_name: string;
          invite_code: string;
          dietary_notes: string | null;
          message: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          family_name: string;
          invite_code: string;
          dietary_notes?: string | null;
          message?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["families"]["Insert"]>;
        Relationships: [];
      };
      members: {
        Row: {
          id: string;
          family_id: string;
          full_name: string;
          attending: boolean | null;
          responded_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          family_id: string;
          full_name: string;
          attending?: boolean | null;
          responded_at?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["members"]["Insert"]>;
        Relationships: [];
      };
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
