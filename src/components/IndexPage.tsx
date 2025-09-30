import { useState, useEffect } from 'react';
import { User, GraduationCap, QrCode, LogOut, Puzzle, Trophy, Clock, Target } from 'lucide-react';
import QRScanner from './QRScanner';
import { validateQRCode, getNextStep, calculateTotalTime, ScannedPiece } from '../utils/qrValidator';

interface Student {
  id: string;
  name: string;
  year: string;
  responsible?: string;
  startTime: string;
  endTime?: string;
  totalTime?: string;
  completed?: boolean;
  scannedPieces?: ScannedPiece[];
}

const IndexPage = () => {
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    const studentData = localStorage.getItem('currentStudent');
    if (studentData) {
      setCurrentStudent(JSON.parse(studentData));
    } else {
      // Se não houver aluno, volta para home
      window.location.href = '/';
    }
  }, []);

  const handleScanSuccess = (decodedText: string) => {
    if (!currentStudent) return;

    const scannedPieces = currentStudent.scannedPieces || [];
    const validation = validateQRCode(decodedText, scannedPieces);

    setShowScanner(false);

    if (!validation.isValid) {
      alert(validation.message);
      if (validation.shouldNavigateHome) {
        return;
      }
    }

    // Tratar brinde final
    if (validation.message === 'brinde') {
      const endTime = new Date().toISOString();
      const totalTime = calculateTotalTime(currentStudent.startTime, endTime);

      const updatedStudent = {
        ...currentStudent,
        endTime,
        totalTime,
        completed: true
      };

      setCurrentStudent(updatedStudent);
      localStorage.setItem('currentStudent', JSON.stringify(updatedStudent));

      // Atualizar lista de alunos
      const students = JSON.parse(localStorage.getItem('students') || '[]');
      const updatedStudents = students.map((s: Student) =>
        s.id === currentStudent.id ? updatedStudent : s
      );
      localStorage.setItem('students', JSON.stringify(updatedStudents));

      alert(`🎉 Parabéns! Você completou a jornada UPverse!\n\nTempo total: ${totalTime}\n\nDirija-se ao ponto de retirada do brinde!`);
      return;
    }

    // Adicionar nova peça
    const location = validation.message;
    const newPiece: ScannedPiece = {
      id: scannedPieces.length + 1,
      code: decodedText,
      timestamp: new Date().toISOString(),
      location: location === 'success' ? 'Quadra' : location
    };

    const updatedPieces = [...scannedPieces, newPiece];
    const updatedStudent = { ...currentStudent, scannedPieces: updatedPieces };

    setCurrentStudent(updatedStudent);
    localStorage.setItem('currentStudent', JSON.stringify(updatedStudent));

    // Atualizar lista de alunos
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const updatedStudents = students.map((s: Student) =>
      s.id === currentStudent.id ? updatedStudent : s
    );
    localStorage.setItem('students', JSON.stringify(updatedStudents));

    // Mensagem de sucesso
    if (updatedPieces.length === 24) {
      alert('🎊 Parabéns! Você coletou todas as 24 peças!\n\nAgora dirija-se ao ponto de retirada do brinde e escaneie o QR Code "brinde final".');
    } else {
      alert(`✅ Peça ${updatedPieces.length}/24 coletada!\n\nContinue para a próxima etapa.`);
    }
  };

  const handleLogout = () => {
    if (confirm('Tem certeza que deseja sair?')) {
      localStorage.removeItem('currentStudent');
      window.location.href = '/';
    }
  };

  if (!currentStudent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-slate-900 to-blue-950">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  const scannedCount = currentStudent.scannedPieces?.length || 0;
  const nextStep = getNextStep(scannedCount);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-blue-950 px-4 py-8">
      {/* QR Scanner Modal */}
      {showScanner && (
        <QRScanner
          onScanSuccess={handleScanSuccess}
          onClose={() => setShowScanner(false)}
        />
      )}

      {/* Main Content */}
      <div className="max-w-md mx-auto">
        {/* Student Info Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border-2 border-blue-900">
          <div className="text-center mb-6">
            <div className="inline-block p-3 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full mb-4">
              <User className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-blue-900 mb-2">
              Olá, {currentStudent.name}!
            </h2>
            <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
              <GraduationCap className="w-5 h-5" />
              <p className="text-lg">{currentStudent.year}</p>
            </div>
            {currentStudent.responsible && (
              <p className="text-sm text-gray-500">
                Responsável: {currentStudent.responsible}
              </p>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-blue-900">
                Progresso da Jornada
              </span>
              <span className="text-sm font-bold text-blue-700">
                {scannedCount}/24 peças
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${(scannedCount / 24) * 100}%` }}
              />
            </div>
          </div>

          {/* Next Step or Completion */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 mb-6 border border-blue-200">
            {currentStudent.completed ? (
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                  <Trophy className="w-6 h-6" />
                  <h3 className="font-bold text-lg">Jornada Concluída!</h3>
                </div>
                <div className="flex items-center justify-center gap-2 text-blue-900">
                  <Clock className="w-5 h-5" />
                  <p className="text-xl font-bold">{currentStudent.totalTime}</p>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Parabéns por completar a UPverse! 🎉
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Próxima Etapa
                </h3>
                {scannedCount === 24 ? (
                  <div className="text-center">
                    <p className="text-blue-800 font-semibold text-lg mb-1">
                      🎊 Todas as peças coletadas!
                    </p>
                    <p className="text-blue-700 font-medium">
                      Dirija-se ao ponto de retirada do brinde
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Escaneie o QR Code "brinde final"
                    </p>
                  </div>
                ) : nextStep ? (
                  <div>
                    <p className="text-blue-800 font-semibold text-lg">
                      {nextStep.code}
                    </p>
                    <p className="text-blue-600 text-sm">
                      📍 {nextStep.location}
                    </p>
                    {scannedCount >= 14 && (
                      <p className="text-gray-600 text-xs mt-2">
                        Faltam {24 - scannedCount} {24 - scannedCount === 1 ? 'peça' : 'peças'}
                      </p>
                    )}
                  </div>
                ) : null}
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => setShowScanner(true)}
              disabled={currentStudent.completed}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3 disabled:cursor-not-allowed"
            >
              <QrCode className="w-6 h-6" />
              {currentStudent.completed ? 'Jornada Concluída' : 'Escanear QR Code'}
            </button>

            <button
              onClick={() => {/* TODO: Ver quebra-cabeça */}}
              className="w-full bg-white hover:bg-gray-50 text-blue-900 font-semibold py-3 px-6 rounded-xl border-2 border-blue-900 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Puzzle className="w-5 h-5" />
              Ver Quebra-cabeça ({scannedCount}/24)
            </button>

            <button
              onClick={handleLogout}
              className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-3 px-6 rounded-xl border border-red-200 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Sair
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;