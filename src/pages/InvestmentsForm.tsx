import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, DollarSign, TrendingUp, PiggyBank, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const InvestmentsForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    // Current Investments
    totalPortfolioValue: '',
    stocksValue: '',
    bondsValue: '',
    mutualFundsValue: '',
    realEstateValue: '',
    cryptoValue: '',
    otherInvestments: '',
    
    // Financial Goals
    retirementGoal: '',
    emergencyFundGoal: '',
    shortTermGoals: '',
    longTermGoals: '',
    riskTolerance: '',
    
    // Income & Expenses
    monthlyIncome: '',
    monthlyExpenses: '',
    debtPayments: '',
    savingsRate: '',
    
    // Additional Info
    investmentExperience: '',
    preferredInvestmentTypes: '',
    notes: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success",
      description: "Your investment and financial planning data has been saved.",
    });
    navigate('/my-data');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={() => navigate('/my-data')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to My Data
        </Button>
        <h1 className="text-3xl font-bold">Investments & Financial Planning</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current Investments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Current Investments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="totalPortfolioValue">Total Portfolio Value</Label>
                <Input
                  id="totalPortfolioValue"
                  placeholder="$0"
                  value={formData.totalPortfolioValue}
                  onChange={(e) => handleInputChange('totalPortfolioValue', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="stocksValue">Stocks Value</Label>
                <Input
                  id="stocksValue"
                  placeholder="$0"
                  value={formData.stocksValue}
                  onChange={(e) => handleInputChange('stocksValue', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="bondsValue">Bonds Value</Label>
                <Input
                  id="bondsValue"
                  placeholder="$0"
                  value={formData.bondsValue}
                  onChange={(e) => handleInputChange('bondsValue', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="mutualFundsValue">Mutual Funds Value</Label>
                <Input
                  id="mutualFundsValue"
                  placeholder="$0"
                  value={formData.mutualFundsValue}
                  onChange={(e) => handleInputChange('mutualFundsValue', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="realEstateValue">Real Estate Value</Label>
                <Input
                  id="realEstateValue"
                  placeholder="$0"
                  value={formData.realEstateValue}
                  onChange={(e) => handleInputChange('realEstateValue', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="cryptoValue">Cryptocurrency Value</Label>
                <Input
                  id="cryptoValue"
                  placeholder="$0"
                  value={formData.cryptoValue}
                  onChange={(e) => handleInputChange('cryptoValue', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="otherInvestments">Other Investments</Label>
              <Textarea
                id="otherInvestments"
                placeholder="Describe any other investments..."
                value={formData.otherInvestments}
                onChange={(e) => handleInputChange('otherInvestments', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Financial Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              Financial Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="retirementGoal">Retirement Goal</Label>
                <Input
                  id="retirementGoal"
                  placeholder="$0"
                  value={formData.retirementGoal}
                  onChange={(e) => handleInputChange('retirementGoal', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="emergencyFundGoal">Emergency Fund Goal</Label>
                <Input
                  id="emergencyFundGoal"
                  placeholder="$0"
                  value={formData.emergencyFundGoal}
                  onChange={(e) => handleInputChange('emergencyFundGoal', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="shortTermGoals">Short Term Goals (1-3 years)</Label>
              <Textarea
                id="shortTermGoals"
                placeholder="Describe your short-term financial goals..."
                value={formData.shortTermGoals}
                onChange={(e) => handleInputChange('shortTermGoals', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="longTermGoals">Long Term Goals (5+ years)</Label>
              <Textarea
                id="longTermGoals"
                placeholder="Describe your long-term financial goals..."
                value={formData.longTermGoals}
                onChange={(e) => handleInputChange('longTermGoals', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="riskTolerance">Risk Tolerance</Label>
              <Select value={formData.riskTolerance} onValueChange={(value) => handleInputChange('riskTolerance', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your risk tolerance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conservative">Conservative</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="aggressive">Aggressive</SelectItem>
                  <SelectItem value="very-aggressive">Very Aggressive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Income & Cash Flow */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Income & Cash Flow
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="monthlyIncome">Monthly Income</Label>
                <Input
                  id="monthlyIncome"
                  placeholder="$0"
                  value={formData.monthlyIncome}
                  onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="monthlyExpenses">Monthly Expenses</Label>
                <Input
                  id="monthlyExpenses"
                  placeholder="$0"
                  value={formData.monthlyExpenses}
                  onChange={(e) => handleInputChange('monthlyExpenses', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="debtPayments">Monthly Debt Payments</Label>
                <Input
                  id="debtPayments"
                  placeholder="$0"
                  value={formData.debtPayments}
                  onChange={(e) => handleInputChange('debtPayments', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="savingsRate">Monthly Savings Rate</Label>
                <Input
                  id="savingsRate"
                  placeholder="$0 or %"
                  value={formData.savingsRate}
                  onChange={(e) => handleInputChange('savingsRate', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Investment Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PiggyBank className="h-5 w-5 text-purple-600" />
              Investment Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="investmentExperience">Investment Experience</Label>
              <Select value={formData.investmentExperience} onValueChange={(value) => handleInputChange('investmentExperience', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                  <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                  <SelectItem value="experienced">Experienced (5-10 years)</SelectItem>
                  <SelectItem value="expert">Expert (10+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="preferredInvestmentTypes">Preferred Investment Types</Label>
              <Textarea
                id="preferredInvestmentTypes"
                placeholder="Describe your preferred investment types and strategies..."
                value={formData.preferredInvestmentTypes}
                onChange={(e) => handleInputChange('preferredInvestmentTypes', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any additional information about your investment and financial planning needs..."
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate('/my-data')}>
            Cancel
          </Button>
          <Button type="submit">
            Save Investment Data
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InvestmentsForm;