import { usePublicProfileStore } from '@/store/public.store';
import { Contact } from '@/types/types';
import React, { useState, useEffect } from 'react';

function ContactCard() {
    const { addContact } = usePublicProfileStore();
    const [contact, setContact] = useState<Contact>({
        name: '',
        email: '',
        message: '',
        dateSent: new Date().toISOString(),
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (field: keyof Contact, value: string) => {
        setContact((prev) => ({
            ...prev,
            [field]: value,
            dateSent: new Date().toISOString(),
        }));
    };

    const handleSubmit = async () => {
        setError(null);
        setSuccess(false);
        if(!addContact)return
        if (!contact.name || !contact.email || !contact.message) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            setLoading(true);
            await addContact(contact);
            setSuccess(true);
            setContact({
                name: '',
                email: '',
                message: '',
                dateSent: new Date().toISOString(),
            });
        } catch (err) {
            console.error(err);
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    return (
        <div className="bg-[#222a3d] p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#98cbff]/10 blur-3xl -mr-16 -mt-16 rounded-full"></div>
            <h2 className="text-2xl font-black mb-2 text-[#dae2fd]">Initialize Contact</h2>
            <p className="text-sm text-[#bec7d4] mb-8">Ready for a new project? Let&apos;s build it together.</p>
            <form className="space-y-4">
                <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#98cbff] mb-2">Identification</label>
                    <input
                        className="w-full bg-[#2d3449] border-none rounded-lg p-4 text-[#dae2fd] placeholder:text-[#88919d] text-sm focus:ring-2 focus:ring-[#98cbff]/50 transition-all"
                        placeholder="Full Name"
                        type="text"
                        value={contact.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#98cbff] mb-2">Comms Channel</label>
                    <input
                        className="w-full bg-[#2d3449] border-none rounded-lg p-4 text-[#dae2fd] placeholder:text-[#88919d] text-sm focus:ring-2 focus:ring-[#98cbff]/50 transition-all"
                        placeholder="email@example.com"
                        type="email"
                        value={contact.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#98cbff] mb-2">Transmission</label>
                    <textarea
                        className="w-full bg-[#2d3449] border-none rounded-lg p-4 text-[#dae2fd] placeholder:text-[#88919d] text-sm focus:ring-2 focus:ring-[#98cbff]/50 transition-all"
                        placeholder="Briefly describe your vision..."
                        rows={4}
                        value={contact.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                    />
                </div>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                {success && <p className="text-green-400 text-sm">Transmission sent successfully!</p>}
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#98cbff] to-[#00a3ff] text-[#0b1326] font-black py-4 rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform disabled:opacity-50"
                >
                    <span>{loading ? 'Sending...' : 'Send Transmission'}</span>
                    <span className="material-symbols-outlined text-sm">send</span>
                </button>
            </form>
        </div>
    );
}

export default ContactCard;
