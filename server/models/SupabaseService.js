import { supabase } from '../config/supabase.js';

export class SupabaseService {
    static async create(serviceData) {
        try {
            const { data, error } = await supabase
                .from('services')
                .insert([{
                    name: serviceData.name,
                    name_ar: serviceData.name_ar,
                    description: serviceData.description,
                    description_ar: serviceData.description_ar,
                    price: serviceData.price,
                    duration: serviceData.duration,
                    category: serviceData.category,
                    is_active: serviceData.is_active !== false,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }])
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            throw new Error(`Error creating service: ${error.message}`);
        }
    }

    static async findAll() {
        try {
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .eq('is_active', true)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data || [];
        } catch (error) {
            throw new Error(`Error fetching services: ${error.message}`);
        }
    }

    static async findById(id) {
        try {
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            throw new Error(`Error finding service: ${error.message}`);
        }
    }

    static async updateById(id, updateData) {
        try {
            const { data, error } = await supabase
                .from('services')
                .update({
                    ...updateData,
                    updated_at: new Date().toISOString()
                })
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            throw new Error(`Error updating service: ${error.message}`);
        }
    }

    static async deleteById(id) {
        try {
            const { error } = await supabase
                .from('services')
                .update({ is_active: false })
                .eq('id', id);

            if (error) throw error;
            return { message: 'Service deleted successfully' };
        } catch (error) {
            throw new Error(`Error deleting service: ${error.message}`);
        }
    }

    static async findByCategory(category) {
        try {
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .eq('category', category)
                .eq('is_active', true)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data || [];
        } catch (error) {
            throw new Error(`Error fetching services by category: ${error.message}`);
        }
    }
} 