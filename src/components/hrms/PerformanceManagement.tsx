import React, { useState } from 'react';
import { Performance, User } from '../../types';
import { mockPerformance } from '../../data/mockData';
import {
  Award,
  TrendingUp,
  Target,
  Star,
  BarChart3,
  Calendar,
  User as UserIcon,
  Plus,
} from 'lucide-react';

interface PerformanceManagementProps {
  user: User;
}

const PerformanceManagement: React.FC<PerformanceManagementProps> = ({ user }) => {
  const [performanceData, setPerformanceData] = useState<Performance[]>(mockPerformance);

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.5) return 'text-yellow-600';
    if (rating >= 3.0) return 'text-orange-600';
    return 'text-red-600';
  };

  const getRatingBg = (rating: number) => {
    if (rating >= 4.5) return 'bg-green-50 border-green-200';
    if (rating >= 4.0) return 'bg-blue-50 border-blue-200';
    if (rating >= 3.5) return 'bg-yellow-50 border-yellow-200';
    if (rating >= 3.0) return 'bg-orange-50 border-orange-200';
    return 'bg-red-50 border-red-200';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : i < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-slate-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Performance Management</h2>
          <p className="text-slate-600">Track KPIs, reviews, and employee performance</p>
        </div>
        <div className="flex space-x-3">
          {user.role !== 'employee' && (
            <button className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>New Review</span>
            </button>
          )}
        </div>
      </div>

      {/* Performance Overview */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold mb-1">4.5</div>
            <div className="text-teal-100 text-sm">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-1">92%</div>
            <div className="text-teal-100 text-sm">Goal Achievement</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-1">15</div>
            <div className="text-teal-100 text-sm">Reviews Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-1">3</div>
            <div className="text-teal-100 text-sm">Pending Reviews</div>
          </div>
        </div>
      </div>

      {/* Performance Reviews */}
      <div className="space-y-6">
        {performanceData.map((performance) => (
          <div
            key={performance.id}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-teal-600 font-semibold">
                    {performance.employeeName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">{performance.employeeName}</h3>
                  <p className="text-slate-600">{performance.period} Performance Review</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-500">
                      Reviewed on {new Date(performance.reviewDate).toLocaleDateString()}
                    </span>
                    <UserIcon className="w-4 h-4 text-slate-400 ml-4" />
                    <span className="text-sm text-slate-500">by {performance.reviewedBy}</span>
                  </div>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-lg border ${getRatingBg(performance.overallRating)}`}>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getRatingColor(performance.overallRating)}`}>
                    {performance.overallRating}
                  </div>
                  <div className="flex items-center justify-center space-x-1 mt-1">
                    {renderStars(performance.overallRating)}
                  </div>
                  <div className="text-xs text-slate-600 mt-1">Overall Rating</div>
                </div>
              </div>
            </div>

            {/* KPIs */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Key Performance Indicators
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {performance.kpis.map((kpi, index) => {
                  const achievementRate = (kpi.achieved / kpi.target) * 100;
                  return (
                    <div key={index} className="bg-slate-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-slate-900">{kpi.name}</h5>
                        <div className="flex items-center space-x-1">
                          {renderStars(kpi.rating)}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                        <span>Target: {kpi.target}</span>
                        <span>Achieved: {kpi.achieved}</span>
                      </div>
                      <div className="bg-slate-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            achievementRate >= 100 ? 'bg-green-500' :
                            achievementRate >= 80 ? 'bg-blue-500' :
                            achievementRate >= 60 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(achievementRate, 100)}%` }}
                        />
                      </div>
                      <div className="text-right mt-1">
                        <span className={`text-sm font-medium ${
                          achievementRate >= 100 ? 'text-green-600' :
                          achievementRate >= 80 ? 'text-blue-600' :
                          achievementRate >= 60 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {achievementRate.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Manager Feedback */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Manager Feedback
              </h4>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-slate-700">{performance.managerFeedback}</p>
              </div>
            </div>

            {/* Goals and Achievements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Goals for Next Period
                </h4>
                <ul className="space-y-2">
                  {performance.goals.map((goal, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-slate-700">{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  Key Achievements
                </h4>
                <ul className="space-y-2">
                  {performance.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-slate-700">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Areas of Improvement */}
            <div>
              <h4 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Areas of Improvement
              </h4>
              <ul className="space-y-2">
                {performance.areasOfImprovement.map((area, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-slate-700">{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {performanceData.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <Award className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No performance reviews found</h3>
          <p className="text-slate-600">Performance reviews will appear here once they are completed</p>
        </div>
      )}
    </div>
  );
};

export default PerformanceManagement;