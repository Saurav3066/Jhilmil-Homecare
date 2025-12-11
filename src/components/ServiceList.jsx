import React from 'react'
import Button from './Button'

export default function ServiceList({ services, onBook }) {
    const [filter, setFilter] = React.useState('All')
    const tabs = ['All', 'Popular', 'Recommended']
    const list = services.filter(s => filter === 'All' ? true : s.tag === filter)

    return (
        <div className="w-full">

            {/* Filter Tabs */}
            <div className="flex gap-3 mb-6">
                {tabs.map(t => (
                    <button
                        key={t}
                        onClick={() => setFilter(t)}
                        className={`
                            px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-xl transition-all
                            border border-white/20 shadow-sm
                            ${filter === t
                                ? 'bg-blue-600 text-white shadow-md scale-105'
                                : 'bg-white/20 text-gray-700 hover:bg-white/30'
                            }
                        `}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {/* Service Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {list.map(s => (
                    <div
                        key={s.id}
                        className="
                            p-5 rounded-2xl 
                            bg-white/20 backdrop-blur-xl 
                            border border-white/30
                            shadow-[0_8px_30px_rgb(0,0,0,0.09)]
                            transition-all hover:shadow-xl hover:scale-[1.02]
                        "
                    >
                        <div className="flex justify-between items-start">

                            {/* Info */}
                            <div>
                                <h4 className="font-semibold text-lg text-gray-900 drop-shadow-sm">
                                    {s.name}
                                </h4>
                                <p className="text-sm text-gray-700 mt-1">
                                    {s.desc}
                                </p>
                                <p className="text-sm text-gray-600 mt-2 font-medium">
                                    {s.freq} • {s.cost}
                                </p>
                            </div>

                            {/* Button */}
                            <div>
                                <Button
                                    onClick={() => onBook(s)}
                                >
                                    Book
                                </Button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
