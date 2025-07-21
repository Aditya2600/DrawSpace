import { ReactNode, useState } from "react";

interface IconButtonProps {
    icon: ReactNode;
    onClick: () => void;
    activated?: boolean;
    tooltip?: string;
}

export function IconButton({ icon, onClick, activated = false, tooltip }: IconButtonProps) {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={onClick}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className={`
                    p-3 rounded-xl transition-all duration-200 ease-out
                    hover:scale-105 active:scale-95
                    ${activated 
                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25' 
                        : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/60 hover:text-white'
                    }
                    border border-gray-600/30 hover:border-gray-500/50
                `}
            >
                {icon}
            </button>
            {tooltip && showTooltip && (
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg border border-gray-700 whitespace-nowrap">
                    {tooltip}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 border-l border-t border-gray-700 rotate-45"></div>
                </div>
            )}
        </div>
    );
}