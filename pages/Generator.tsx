import React, { useState } from 'react';
import { UserDeviceData, SensitivityData } from '../types';
import { generateSensitivity } from '../services/geminiService';
import { Smartphone, Settings, Hand, Loader2, AlertCircle, Info, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const initialData: UserDeviceData = {
  phoneModel: '',
  developerModeEnabled: false,
  dpiKnown: false,
  currentDpi: undefined,
  hudFingers: 2,
};

export const Generator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<UserDeviceData>(initialData);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SensitivityData | null>(null);
  const navigate = useNavigate();

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleGenerate = async () => {
    setLoading(true);
    const resultData = await generateSensitivity(data);
    setResult(resultData);
    setLoading(false);
    setStep(4);
  };

  const renderStep1 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-dfl-primary/20 text-dfl-primary flex items-center justify-center">
          <Smartphone className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Qual o modelo do seu telefone?</h3>
          <p className="text-gray-400 text-sm">A IA precisa conhecer seu hardware para calcular a precisão.</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Digite o Modelo</label>
        <input
          type="text"
          value={data.phoneModel}
          onChange={(e) => setData({ ...data, phoneModel: e.target.value })}
          placeholder="Ex: Samsung A54, Xiaomi Redmi Note 12..."
          className="w-full bg-dfl-dark border border-white/10 rounded-lg p-4 text-white focus:border-dfl-primary focus:ring-1 focus:ring-dfl-primary outline-none transition-all"
        />
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg flex gap-3 items-start">
        <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-yellow-500 font-bold text-sm mb-1">Não sabe o modelo?</h4>
          <p className="text-gray-400 text-xs">
            Vá em <strong>Configurações</strong> {'>'} <strong>Sobre o Telefone</strong> para encontrar o modelo exato do seu Android ou iOS.
          </p>
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={!data.phoneModel}
        className="w-full bg-dfl-primary hover:bg-dfl-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition-all"
      >
        Próximo
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-dfl-secondary/20 text-dfl-secondary flex items-center justify-center">
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Configuração de DPI</h3>
          <p className="text-gray-400 text-sm">A densidade de pixels define a sensibilidade de movimento.</p>
        </div>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
        <h4 className="text-blue-400 font-bold mb-3 text-sm flex items-center gap-2">
          <Info className="w-4 h-4" />
          Como encontrar sua DPI (Android)
        </h4>
        <ol className="list-decimal list-inside text-xs text-gray-300 space-y-2">
          <li>Vá em <strong>Configurações</strong> {'>'} <strong>Sobre o telefone</strong>.</li>
          <li>Toque 7 vezes em <strong>"Número da Versão"</strong> para ativar o modo Desenvolvedor.</li>
          <li>Volte e acesse <strong>Sistema</strong> {'>'} <strong>Opções do Desenvolvedor</strong>.</li>
          <li>Procure por <strong>"Largura Mínima"</strong> ou <strong>"Menor Largura"</strong>.</li>
        </ol>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">DPI Atual (Opcional)</label>
        <input
          type="number"
          value={data.currentDpi || ''}
          onChange={(e) => setData({ ...data, currentDpi: parseInt(e.target.value) || undefined })}
          placeholder="Ex: 411 (Padrão de muitos Androids)"
          className="w-full bg-dfl-dark border border-white/10 rounded-lg p-4 text-white focus:border-dfl-primary outline-none"
        />
        <p className="text-xs text-gray-500 mt-2">Se não preencher, calcularemos a ideal do zero.</p>
      </div>

      <div className="flex gap-3">
        <button onClick={handleBack} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-4 rounded-lg">Voltar</button>
        <button onClick={handleNext} className="flex-1 bg-dfl-primary hover:bg-dfl-primary/90 text-white font-bold py-4 rounded-lg">Próximo</button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-dfl-accent/20 text-dfl-accent flex items-center justify-center">
          <Hand className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Quantos dedos você usa? (HUD)</h3>
          <p className="text-gray-400 text-sm">Selecione a quantidade de dedos que você usa para jogar (Max: 10).</p>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {Array.from({ length: 9 }, (_, i) => i + 2).map((fingers) => (
          <button
            key={fingers}
            onClick={() => setData({ ...data, hudFingers: fingers })}
            className={`p-3 rounded-lg border transition-all flex flex-col items-center justify-center aspect-square ${
              data.hudFingers === fingers
                ? 'border-dfl-primary bg-dfl-primary/20 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]'
                : 'border-white/10 bg-dfl-card text-gray-400 hover:border-white/30 hover:bg-white/5'
            }`}
          >
            <span className="text-xl font-bold">{fingers}</span>
            <span className="text-[10px] uppercase">Dedos</span>
          </button>
        ))}
      </div>

      <div className="mt-2 text-center text-sm text-gray-400 min-h-[20px]">
        {data.hudFingers === 2 && "Estilo Padrão: Focado em precisão e estabilidade."}
        {data.hudFingers === 3 && "Estilo Híbrido: Boa movimentação e gelo rápido."}
        {data.hudFingers === 4 && "Estilo Pro: Movimentação insana e combos rápidos."}
        {data.hudFingers > 4 && "Estilo Hardcore: Controle total sobre todas as ações."}
      </div>

      <div className="flex gap-3 mt-6">
        <button onClick={handleBack} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-4 rounded-lg">Voltar</button>
        <button 
          onClick={handleGenerate} 
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-dfl-primary to-dfl-accent text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:shadow-[0_0_30px_rgba(244,63,94,0.5)] transition-all"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'GERAR SENSI PERFEITA'}
        </button>
      </div>
    </div>
  );

  const renderResult = () => {
    if (!result) return <div className="text-red-500 text-center">Erro ao gerar. Tente novamente.</div>;

    return (
      <div className="animate-fadeIn">
        <div className="text-center mb-8">
          <div className="inline-block p-2 rounded-full bg-green-500/20 text-green-400 mb-2">
            <Loader2 className="w-6 h-6 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <h3 className="text-2xl font-black text-white">SENSIBILIDADE DFLTOOLS</h3>
          <p className="text-gray-400 text-sm">Otimizado para {data.phoneModel} ({data.hudFingers} Dedos)</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="col-span-2 bg-gradient-to-r from-dfl-primary/10 to-dfl-secondary/10 p-4 rounded-xl border border-dfl-primary/30 text-center">
            <div className="text-sm text-dfl-primary mb-1 uppercase tracking-wider font-bold">DPI RECOMENDADA</div>
            <div className="text-5xl font-black text-white tracking-tighter">{result.dpi}</div>
          </div>

          <div className="bg-dfl-dark p-4 rounded-lg border border-white/10">
            <div className="text-gray-400 text-xs uppercase mb-1">Geral</div>
            <div className="text-3xl font-bold text-white">{result.general}</div>
            <div className="w-full h-1.5 bg-gray-800 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-white" style={{ width: `${result.general}%` }}></div>
            </div>
          </div>
          <div className="bg-dfl-dark p-4 rounded-lg border border-white/10">
            <div className="text-gray-400 text-xs uppercase mb-1">Ponto Vermelho</div>
            <div className="text-3xl font-bold text-white">{result.redDot}</div>
            <div className="w-full h-1.5 bg-gray-800 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-dfl-accent" style={{ width: `${result.redDot}%` }}></div>
            </div>
          </div>
          <div className="bg-dfl-dark p-4 rounded-lg border border-white/10">
            <div className="text-gray-400 text-xs uppercase mb-1">Mira 2x</div>
            <div className="text-2xl font-bold text-white">{result.scope2x}</div>
          </div>
          <div className="bg-dfl-dark p-4 rounded-lg border border-white/10">
            <div className="text-gray-400 text-xs uppercase mb-1">Mira 4x</div>
            <div className="text-2xl font-bold text-white">{result.scope4x}</div>
          </div>
          <div className="bg-dfl-dark p-4 rounded-lg border border-white/10">
            <div className="text-gray-400 text-xs uppercase mb-1">AWM</div>
            <div className="text-2xl font-bold text-white">{result.sniper}</div>
          </div>
          <div className="bg-dfl-dark p-4 rounded-lg border border-white/10">
            <div className="text-gray-400 text-xs uppercase mb-1">Olhadinha</div>
            <div className="text-2xl font-bold text-white">{result.freeLook}</div>
          </div>
        </div>

        <div className="bg-gray-800/50 p-5 rounded-lg text-sm text-gray-300 leading-relaxed border-l-4 border-dfl-secondary">
          <strong className="text-dfl-secondary block mb-1">Análise Técnica da IA:</strong> 
          {result.explanation}
        </div>

        <button 
          onClick={() => {setStep(1); setResult(null); setData(initialData)}}
          className="w-full mt-6 bg-white/10 hover:bg-white/20 text-white py-4 rounded-lg transition-all font-medium"
        >
          Gerar Nova Configuração
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-dfl-dark pt-24 pb-20 flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 max-w-md relative">
        <button 
            onClick={() => navigate('/')}
            className="absolute -top-16 left-0 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
        </button>

        <div className="bg-dfl-card border border-white/10 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-dfl-primary/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-dfl-secondary/20 rounded-full blur-3xl pointer-events-none"></div>
          
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderResult()}
        </div>
      </div>
    </div>
  );
};