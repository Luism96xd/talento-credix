
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User, Building2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from 'react-markdown';

interface RequisitionDetails {
  id: string;
  title: string;
  department: string;
  status: "draft" | "submitted";
  individual_analysis: string;
  created_at: string;
  file_url: string;
  submitted_at: string | null;
  user: {
    full_name: string;
  };
  period: {
    name: string;
  };
}

interface Answer {
  id: string;
  question: {
    question_text: string;
    description: string;
    question_order: number;
  };
  answer_content: string;
  created_at: string;
}

export default function RequisitionDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<RequisitionDetails | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchRequisitionDetails();
    }
  }, [id]);

  const fetchRequisitionDetails = async () => {
    try {
      // Fetch report details
      const { data: reportData, error: reportError } = await supabase
        .from('monthly_reports')
        .select(`*,user:profiles(full_name),period:reporting_periods(name)`)
        .eq('id', id)
        .single();

      if (reportError) throw reportError;
      setReport(reportData);

      // Fetch answers with questions
      const { data: answersData, error: answersError } = await supabase
        .from('report_answers')
        .select(`
          *,
          question:report_questions(
            question_text,
            description,
            question_order
          )
        `)
        .eq('report_id', id)

        if (answersError) throw answersError;
        answersData.sort((a, b) => a.question.question_order - b.question.question_order);
      setAnswers(answersData || []);
    } catch (error) {
      console.error('Error fetching report details:', error);
      toast.error("Error al cargar los detalles del informe");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Informe no encontrado</h2>
        <Button onClick={() => navigate('/reports')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a Informes
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => navigate('/reports')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{report.title}</h1>
            <p className="text-muted-foreground mt-1">
              Detalles del informe mensual
            </p>
          </div>
        </div>
        <Badge variant={report.status === "submitted" ? "default" : "secondary"}>
          {report.status === "submitted" ? "Enviado" : "Borrador"}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Información del Informe
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Departamento</p>
                <p className="text-sm text-muted-foreground">{report.department}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Período</p>
                <p className="text-sm text-muted-foreground">{report.period.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Fecha Entrega</p>
                <p className="text-sm text-muted-foreground">
                  {report.submitted_at ? new Date(report.submitted_at).toLocaleDateString() : 'No especificada'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
            {answers.map((answer) => (
              <Card key={answer.id}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {answer.question.question_text}
                  </CardTitle>
                  <CardDescription>{answer.question.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <ReactMarkdown>
                      {answer.answer_content}
                    </ReactMarkdown>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      Respondido el {new Date(answer.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
            {answers.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">No hay respuestas disponibles para este informe.</p>
                </CardContent>
              </Card>
            )}
          </div>
    </div>
  );
}
