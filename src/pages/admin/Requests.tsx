import { useState, useEffect } from 'react';
import { Doodle } from '../../components/ui/Doodle';

interface UserRequest {
    id: string;
    type: 'Petition' | 'Custom';
    subject: string;
    message: string;
    status: 'Pending' | 'InProgress' | 'Completed' | 'Rejected';
    adminNote: string | null;
    createdAt: string;
    user: {
        name: string;
        email: string;
    };
}

export function AdminRequests() {
    const [requests, setRequests] = useState<UserRequest[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const fetchRequests = async () => {
        try {
            const response = await fetch('/api/requests');
            if (response.ok) {
                const data = await response.json();
                setRequests(data);
            } else {
                setError('Failed to load requests');
            }
        } catch (err) {
            setError('Network error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleUpdateStatus = async (id: string, status: string, adminNote: string) => {
        setUpdatingId(id);
        try {
            const response = await fetch(`/api/requests/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status, adminNote }),
            });

            if (response.ok) {
                await fetchRequests();
            } else {
                alert('Update failed');
            }
        } catch (err) {
            alert('Error updating status');
        } finally {
            setUpdatingId(null);
        }
    };

    if (isLoading) return <div className="p-8 text-center font-hand text-2xl">Loading requests...</div>;
    if (error) return <div className="p-8 text-center text-red-500 font-hand text-2xl">{error}</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center mb-6">
                <div className="relative inline-block">
                    <h1 className="font-marker text-3xl text-brand-brown transform -rotate-1">User Requests</h1>
                    <Doodle type="underline" className="absolute -bottom-1 left-0 w-full text-brand-orange h-3" />
                </div>
            </div>

            <div className="space-y-6">
                {requests.length === 0 ? (
                    <div className="bg-white p-12 rounded-xl border-4 border-dashed border-brand-brown/20 text-center">
                        <p className="font-hand text-2xl text-brand-brown/50">No requests found.</p>
                    </div>
                ) : (
                    requests.map((request) => (
                        <div key={request.id} className="bg-white p-6 rounded-xl shadow-lg border-2 border-brand-brown/10 hover:border-brand-orange transition-colors">
                            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className={`px-3 py-1 rounded-full text-sm font-marker ${request.type === 'Petition' ? 'bg-brand-burgundy text-white' : 'bg-brand-orange text-white'
                                            }`}>
                                            {request.type}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-sm font-marker ${request.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                request.status === 'InProgress' ? 'bg-blue-100 text-blue-700' :
                                                    request.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                        'bg-red-100 text-red-700'
                                            }`}>
                                            {request.status}
                                        </span>
                                    </div>
                                    <h3 className="font-marker text-2xl text-brand-brown">{request.subject}</h3>
                                    <p className="font-hand text-lg text-brand-brown/70 italic">
                                        From {request.user.name} ({request.user.email}) on {new Date(request.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-brand-cream/10 p-4 rounded-lg border-2 border-brand-brown/5 mb-6">
                                <p className="font-hand text-xl text-brand-brown whitespace-pre-wrap">{request.message}</p>
                            </div>

                            <div className="border-t-2 border-brand-brown/5 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block font-marker text-sm text-brand-brown mb-2 uppercase tracking-wider">Admin Response Notes</label>
                                    <textarea
                                        defaultValue={request.adminNote || ''}
                                        onBlur={(e) => handleUpdateStatus(request.id, request.status, e.target.value)}
                                        placeholder="Add notes or response..."
                                        className="w-full p-3 border-2 border-brand-brown/10 rounded-lg focus:border-brand-orange outline-none font-hand text-lg"
                                        rows={3}
                                    />
                                </div>
                                <div>
                                    <label className="block font-marker text-sm text-brand-brown mb-2 uppercase tracking-wider">Change Status</label>
                                    <div className="flex flex-wrap gap-2">
                                        {(['Pending', 'InProgress', 'Completed', 'Rejected'] as const).map((status) => (
                                            <button
                                                key={status}
                                                onClick={() => handleUpdateStatus(request.id, status, request.adminNote || '')}
                                                disabled={updatingId === request.id}
                                                className={`px-4 py-2 rounded-lg font-marker text-sm transition-all ${request.status === status
                                                        ? 'bg-brand-brown text-white shadow-md'
                                                        : 'bg-white text-brand-brown border-2 border-brand-brown/10 hover:border-brand-orange'
                                                    }`}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
