export default function SingUpLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return(
        <body className="bg-principal">
            {children}
        </body>
    );
}