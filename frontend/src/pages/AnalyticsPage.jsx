import React, { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, MousePointerClick, Link as LinkIcon, ExternalLink, RefreshCw } from 'lucide-react';
import api from '../utils/api';

export const AnalyticsPage = () => {
  const [data, setData] = useState({ totalClicks: 0, popularLinks: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await api.get('/analytics/dashboard');
      setData(res.data);
      setError('');
    } catch (err) {
      setError('Failed to load analytics data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Analytics Dashboard</h1>
          <p className="text-slate-400 mt-2">Track link engagement and performance over time.</p>
        </div>
        <button
          onClick={fetchAnalytics}
          className="p-3 text-slate-400 hover:text-primary-400 hover:bg-primary-500/10 rounded-xl transition-colors"
          title="Refresh Data"
        >
          <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {error ? (
        <div className="p-4 bg-red-500/10 text-red-400 rounded-xl border border-red-500/20 flex items-center gap-2">
          {error}
        </div>
      ) : loading && data.popularLinks.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-8 flex-1">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MetricCard
              title="Total Link Clicks"
              value={data.totalClicks}
              icon={<MousePointerClick className="text-primary-500" size={24} />}
            // trend="+12% this week"
            />
            <MetricCard
              title="Active Links"
              value={data.popularLinks.length}
              icon={<LinkIcon className="text-emerald-500" size={24} />}
            />
            <MetricCard
              title="Top Performing Platform"
              value={data.popularLinks[0]?.platform || 'N/A'}
              icon={<TrendingUp className="text-rose-500" size={24} />}
              subtitle={data.popularLinks[0] ? `${data.popularLinks[0].clickCount} clicks` : ''}
            />
          </div>

          {/* Popular Links Table */}
          <div className="glass-card text-left border border-white/10 rounded-3xl overflow-hidden flex-1 flex flex-col">
            <div className="p-6 border-b border-white/10 flex items-center gap-3">
              <BarChart3 className="text-primary-500" size={24} />
              <h2 className="text-xl font-bold text-white">Link Performance</h2>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-slate-400 text-sm font-semibold uppercase tracking-wider">
                    <th className="px-6 py-4">Platform</th>
                    <th className="px-6 py-4">Destination URL</th>
                    <th className="px-6 py-4 text-right">Total Clicks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {data.popularLinks.length > 0 ? (
                    data.popularLinks.map((link, idx) => (
                      <tr key={link.id} className="hover:bg-white/5 text-slate-300 transition-colors">
                        <td className="px-6 py-4 font-medium flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs text-slate-400">
                            {idx + 1}
                          </span>
                          {link.platform}
                        </td>
                        <td className="px-6 py-4 max-w-sm">
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="truncate block hover:text-primary-400 transition-colors flex items-center gap-1 group"
                          >
                            <span className="truncate">{link.url}</span>
                            <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                          </a>
                        </td>
                        <td className="px-6 py-4 text-right font-bold text-white text-lg">
                          {link.clickCount}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="px-6 py-12 text-center text-slate-400">
                        No links available or no clicks recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MetricCard = ({ title, value, icon, trend, subtitle }) => (
  <div className="glass-card p-6 rounded-3xl border border-white/10 flex flex-col gap-4 hover:shadow-[0_8px_32px_rgba(20,184,166,0.15)] transition-shadow">
    <div className="flex items-center justify-between">
      <h3 className="text-slate-400 font-medium">{title}</h3>
      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5">
        {icon}
      </div>
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-4xl font-bold text-white tracking-tight">{value}</span>
      {trend && <span className="text-sm font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">{trend}</span>}
      {subtitle && <span className="text-sm text-slate-400">{subtitle}</span>}
    </div>
  </div>
);
