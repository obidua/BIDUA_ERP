import React, { useState } from 'react';
import { Building2, Factory, Code, Briefcase, ShoppingCart, Heart, GraduationCap, HardHat, Hotel, Check } from 'lucide-react';
import { companyService } from '../../services/companyService';

interface CompanySetupWizardProps {
  onComplete: (companyId: string) => void;
}

const industries = [
  { id: 'manufacturing', name: 'Manufacturing & Production', icon: Factory, modules: ['production', 'inventory', 'bom', 'quality'] },
  { id: 'it_software', name: 'IT & Software Development', icon: Code, modules: ['projects', 'tasks', 'sprints', 'clients'] },
  { id: 'services', name: 'Professional Services', icon: Briefcase, modules: ['services', 'booking', 'scheduling', 'billing'] },
  { id: 'retail', name: 'Retail & E-commerce', icon: ShoppingCart, modules: ['pos', 'inventory', 'products', 'orders'] },
  { id: 'healthcare', name: 'Healthcare & Medical', icon: Heart, modules: ['patients', 'appointments', 'medical_records', 'billing'] },
  { id: 'education', name: 'Education & Training', icon: GraduationCap, modules: ['courses', 'students', 'assessments', 'attendance'] },
  { id: 'construction', name: 'Construction & Real Estate', icon: HardHat, modules: ['projects', 'contracts', 'equipment', 'labor'] },
  { id: 'hospitality', name: 'Hospitality & Tourism', icon: Hotel, modules: ['bookings', 'rooms', 'guests', 'billing'] },
];

const subscriptionTiers = [
  { id: 'basic', name: 'Basic', price: '$29/month', features: ['Up to 10 users', '5 modules', 'Basic support', '10GB storage'] },
  { id: 'professional', name: 'Professional', price: '$99/month', features: ['Up to 50 users', 'All modules', 'Priority support', '100GB storage', 'Advanced analytics'] },
  { id: 'enterprise', name: 'Enterprise', price: 'Custom', features: ['Unlimited users', 'All modules', '24/7 support', 'Unlimited storage', 'Custom integrations', 'Dedicated account manager'] },
];

export default function CompanySetupWizard({ onComplete }: CompanySetupWizardProps) {
  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedTier, setSelectedTier] = useState('professional');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleComplete = async () => {
    if (!companyName.trim()) {
      setError('Company name is required');
      return;
    }

    if (!selectedIndustry) {
      setError('Please select an industry');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const industry = industries.find(i => i.id === selectedIndustry);
      const company = await companyService.createCompany({
        name: companyName.trim(),
        industry_type: selectedIndustry,
        active_modules: industry?.modules || [],
        subscription_tier: selectedTier,
        settings: {
          onboarding_completed: true,
          setup_date: new Date().toISOString(),
        },
      });

      onComplete(company.id);
    } catch (err: any) {
      setError(err.message || 'Failed to create company');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl p-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex items-center flex-1">
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-full font-semibold
                ${step >= stepNum ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}
              `}>
                {step > stepNum ? <Check size={20} /> : stepNum}
              </div>
              {stepNum < 3 && (
                <div className={`flex-1 h-1 mx-4 ${step > stepNum ? 'bg-blue-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        {step === 1 && (
          <div>
            <div className="text-center mb-8">
              <Building2 className="mx-auto mb-4 text-blue-600" size={48} />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to BIDUA ERP</h2>
              <p className="text-gray-600">Let's set up your company profile</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your company name"
                />
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={!companyName.trim()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Industry</h2>
              <p className="text-gray-600">We'll customize your workspace based on your industry</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {industries.map((industry) => {
                const Icon = industry.icon;
                return (
                  <button
                    key={industry.id}
                    onClick={() => setSelectedIndustry(industry.id)}
                    className={`
                      p-6 rounded-xl border-2 text-left transition-all
                      ${selectedIndustry === industry.id
                        ? 'border-blue-600 bg-blue-50 shadow-lg'
                        : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                      }
                    `}
                  >
                    <div className="flex items-start space-x-4">
                      <Icon className={selectedIndustry === industry.id ? 'text-blue-600' : 'text-gray-600'} size={32} />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{industry.name}</h3>
                        <div className="flex flex-wrap gap-2">
                          {industry.modules.map((module) => (
                            <span key={module} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                              {module}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!selectedIndustry}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Plan</h2>
              <p className="text-gray-600">Select the subscription tier that fits your needs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {subscriptionTiers.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className={`
                    p-6 rounded-xl border-2 text-left transition-all
                    ${selectedTier === tier.id
                      ? 'border-blue-600 bg-blue-50 shadow-xl scale-105'
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                    }
                  `}
                >
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{tier.name}</h3>
                  <p className="text-3xl font-bold text-blue-600 mb-4">{tier.price}</p>
                  <ul className="space-y-2">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-700">
                        <Check size={16} className="mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            <div className="flex justify-between">
              <button
                onClick={() => setStep(2)}
                disabled={loading}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Back
              </button>
              <button
                onClick={handleComplete}
                disabled={loading}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-semibold"
              >
                {loading ? 'Creating...' : 'Complete Setup'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
