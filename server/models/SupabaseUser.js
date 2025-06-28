import { supabase } from '../config/supabase.js';
import bcrypt from 'bcryptjs';

export class SupabaseUser {
    static async create(userData) {
        try {
            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(userData.password, salt);

            const { data, error } = await supabase
                .from('users')
                .insert([{
                    name: userData.name,
                    email: userData.email,
                    password: hashedPassword,
                    phone: userData.phone,
                    role: userData.role || 'customer',
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }])
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }

    static async findByEmail(email) {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('email', email)
                .single();

            if (error && error.code !== 'PGRST116') throw error;
            return data;
        } catch (error) {
            return null;
        }
    }

    static async findById(id) {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            throw new Error(`Error finding user: ${error.message}`);
        }
    }

    static async updateById(id, updateData) {
        try {
            const { data, error } = await supabase
                .from('users')
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
            throw new Error(`Error updating user: ${error.message}`);
        }
    }

    static async comparePassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

    static async findAll() {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('id, name, email, phone, role, created_at')
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data;
        } catch (error) {
            throw new Error(`Error fetching users: ${error.message}`);
        }
    }
} 