import { SignIn, SignUp } from '@clerk/clerk-react';
import { Doodle } from '../components/ui/Doodle';

export function Login() {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="relative mb-8 text-center">
                <h1 className="font-marker text-5xl text-brand-brown transform -rotate-2">Welcome Back</h1>
                <Doodle type="underline" className="absolute -bottom-2 left-0 w-full text-brand-orange h-4 opacity-50" />
            </div>
            <SignIn
                routing="path"
                path="/login"
                signUpUrl="/signup"
                appearance={{
                    elements: {
                        formButtonPrimary: 'bg-brand-burgundy hover:bg-brand-brown text-brand-cream font-marker text-lg p-4 rounded-xl shadow-lg transition-all',
                        card: 'bg-white border-4 border-brand-brown/10 shadow-2xl rounded-3xl p-6',
                        headerTitle: 'font-marker text-3xl text-brand-brown',
                        headerSubtitle: 'font-hand text-xl text-brand-brown/60',
                        socialButtonsBlockButton: 'border-2 border-brand-brown/10 hover:bg-brand-cream/20 transition-all font-hand text-lg',
                        formFieldInput: 'border-2 border-brand-brown/20 focus:border-brand-burgundy rounded-xl p-3 font-hand text-lg',
                        footerActionText: 'font-hand text-lg',
                        footerActionLink: 'font-hand text-lg text-brand-burgundy font-bold'
                    }
                }}
            />
        </div>
    );
}

export function Signup() {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="relative mb-8 text-center">
                <h1 className="font-marker text-5xl text-brand-brown transform rotate-1 underline decoration-brand-orange decoration-dashed">Join the Society</h1>
                <p className="font-hand text-xl text-brand-brown/60 mt-2 italic">Be part of something big!</p>
            </div>
            <SignUp
                routing="path"
                path="/signup"
                signInUrl="/login"
                appearance={{
                    elements: {
                        formButtonPrimary: 'bg-brand-orange hover:bg-brand-brown text-brand-cream font-marker text-lg p-4 rounded-xl shadow-lg transition-all',
                        card: 'bg-white border-4 border-brand-brown/10 shadow-2xl rounded-3xl p-6',
                        headerTitle: 'font-marker text-3xl text-brand-brown',
                        headerSubtitle: 'font-hand text-xl text-brand-brown/60',
                        socialButtonsBlockButton: 'border-2 border-brand-brown/10 hover:bg-brand-cream/20 transition-all font-hand text-lg',
                        formFieldInput: 'border-2 border-brand-brown/20 focus:border-brand-burgundy rounded-xl p-3 font-hand text-lg',
                        footerActionText: 'font-hand text-lg',
                        footerActionLink: 'font-hand text-lg text-brand-burgundy font-bold'
                    }
                }}
            />
        </div>
    );
}
