export function MovieLayout({ children }) {
    return (
        <div className="min-h-screen bg-gradient-hero text-slate-100">
            <div className="mx-auto flex max-w-6xl flex-col px-4 sm:px-6 lg:px-8">
                {children}
            </div>
        </div>
    );
}

