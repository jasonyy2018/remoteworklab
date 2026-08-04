interface AdPlaceholderProps {
  slotName?: string;
  variant?: 'in-article' | 'sidebar' | 'banner';
  className?: string;
}

export default function AdPlaceholder({
  slotName = 'Google AdSense 广告位',
  variant = 'in-article',
  className = '',
}: AdPlaceholderProps) {
  return (
    <div
      className={`my-6 flex flex-col items-center justify-center border border-dashed border-slate-300 bg-slate-50/80 rounded-xl p-4 text-center text-xs text-slate-400 ${
        variant === 'sidebar'
          ? 'h-60 w-full'
          : variant === 'banner'
          ? 'h-24 w-full'
          : 'h-36 w-full'
      } ${className}`}
    >
      <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 bg-slate-200/60 px-2 py-0.5 rounded">
        ADVERTISEMENT
      </span>
      <span className="mt-1 font-medium text-slate-500">{slotName}</span>
      <span className="text-[10px] text-slate-400 mt-0.5">
        (已预留 Google AdSense 组件卡位，后续直接替换为真实的 adsbygoogle 逻辑)
      </span>
    </div>
  );
}
