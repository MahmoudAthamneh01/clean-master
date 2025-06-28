import { supabase } from '../config/supabase.js';

export class SupabaseBooking {
    static generateBookingNumber() {
        const prefix = 'CM';
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `${prefix}${timestamp}${random}`;
    }

    static async create(bookingData) {
        try {
            const bookingNumber = this.generateBookingNumber();
            
            const { data, error } = await supabase
                .from('bookings')
                .insert([{
                    booking_number: bookingNumber,
                    user_id: bookingData.user_id,
                    service_id: bookingData.service_id,
                    scheduled_date: bookingData.scheduled_date,
                    scheduled_time: bookingData.scheduled_time,
                    address: bookingData.address,
                    phone: bookingData.phone,
                    notes: bookingData.notes,
                    status: 'pending',
                    total_price: bookingData.total_price,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }])
                .select(`
                    *,
                    users:user_id(name, email, phone),
                    services:service_id(name, name_ar, price, duration)
                `)
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            throw new Error(`Error creating booking: ${error.message}`);
        }
    }

    static async findByUserId(userId) {
        try {
            const { data, error } = await supabase
                .from('bookings')
                .select(`
                    *,
                    services:service_id(name, name_ar, price, duration, category)
                `)
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data || [];
        } catch (error) {
            throw new Error(`Error fetching user bookings: ${error.message}`);
        }
    }

    static async findAll() {
        try {
            const { data, error } = await supabase
                .from('bookings')
                .select(`
                    *,
                    users:user_id(name, email, phone),
                    services:service_id(name, name_ar, price, duration, category)
                `)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data || [];
        } catch (error) {
            throw new Error(`Error fetching bookings: ${error.message}`);
        }
    }

    static async findById(id) {
        try {
            const { data, error } = await supabase
                .from('bookings')
                .select(`
                    *,
                    users:user_id(name, email, phone),
                    services:service_id(name, name_ar, price, duration, category)
                `)
                .eq('id', id)
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            throw new Error(`Error finding booking: ${error.message}`);
        }
    }

    static async updateStatus(id, status) {
        try {
            const { data, error } = await supabase
                .from('bookings')
                .update({
                    status: status,
                    updated_at: new Date().toISOString()
                })
                .eq('id', id)
                .select(`
                    *,
                    users:user_id(name, email, phone),
                    services:service_id(name, name_ar, price, duration)
                `)
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            throw new Error(`Error updating booking status: ${error.message}`);
        }
    }

    static async findByBookingNumber(bookingNumber) {
        try {
            const { data, error } = await supabase
                .from('bookings')
                .select(`
                    *,
                    users:user_id(name, email, phone),
                    services:service_id(name, name_ar, price, duration, category)
                `)
                .eq('booking_number', bookingNumber)
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            throw new Error(`Error finding booking by number: ${error.message}`);
        }
    }

    static async getStats() {
        try {
            const { data: totalBookings, error: totalError } = await supabase
                .from('bookings')
                .select('id', { count: 'exact' });

            const { data: pendingBookings, error: pendingError } = await supabase
                .from('bookings')
                .select('id', { count: 'exact' })
                .eq('status', 'pending');

            const { data: completedBookings, error: completedError } = await supabase
                .from('bookings')
                .select('id', { count: 'exact' })
                .eq('status', 'completed');

            if (totalError || pendingError || completedError) {
                throw new Error('Error fetching booking stats');
            }

            return {
                total: totalBookings?.length || 0,
                pending: pendingBookings?.length || 0,
                completed: completedBookings?.length || 0
            };
        } catch (error) {
            throw new Error(`Error fetching booking stats: ${error.message}`);
        }
    }
} 