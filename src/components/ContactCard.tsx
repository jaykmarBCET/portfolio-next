import { usePublicProfileStore } from '@/store/public.store';
import { Contact } from '@/types/types';
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from '@radix-ui/react-label';
import { Button } from './ui/button';

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
        <div className="mt-4   py-10 bg-[#39393934] w-[96vw]  mx-auto shadow rounded-2xl">
            <h1 className="text-center text-3xl md:text-4xl font-extrabold italic tracking-wide mb-10 text-gray-800 dark:text-gray-100">
                Contact Us
            </h1>

            <Card className="bg-white sm:w-96 text-black  md:w-[50vw] lg:w-[70vw] mx-auto">
                <CardHeader className="space-y-4">
                    <CardTitle className="text-center text-xl font-bold italic">Send a Message or Feedback</CardTitle>

                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            placeholder="Enter your name"
                            value={contact.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={contact.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                            id="message"
                            placeholder="Enter your message"
                            value={contact.message}
                            onChange={(e) => handleChange('message', e.target.value)}
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {success && <p className="text-green-600 text-sm">Message sent successfully!</p>}

                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? 'Sending...' : 'Send'}
                    </Button>
                </CardHeader>
            </Card>
        </div>
    );
}

export default ContactCard;
