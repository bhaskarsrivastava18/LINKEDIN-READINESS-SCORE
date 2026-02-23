const PageLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-slate-100 to-slate-300 text-slate-400">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col items-start gap-4">
        {(title || subtitle) && (
          <div className="mb-10">
            {title && (
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-800">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-2 text-slate-500 max-w-2xl">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
