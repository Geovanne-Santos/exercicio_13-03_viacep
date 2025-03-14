import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "./global.css"

interface DadosInterface{
  cep: String,
  logradouro	: String,
  complemento	: String,
  unidade	: String,
  bairro	: String,
  localidade	: String,
  uf: String,
  estado: String,
  regiao: String,
}

export default function App() {
  const [cep, setCep] = useState("");
  const [dados, setDados] = useState<DadosInterface | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const buscarCEP = async () => {
    if (cep.length !== 8) {
      setError("CEP inválido. Digite 8 números.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        setError("CEP não encontrado.");
        setDados(null);
      } else {
        setDados(data);
      }
    } catch (err) {
      setError("Erro ao buscar o CEP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-gray-100 p-4">
      <Text className="text-2xl font-bold text-gray-800 mb-4">Consulta ViaCEP</Text>
      <TextInput
        className="w-72 p-3 border border-gray-300 rounded-xl bg-white text-lg"
        placeholder="Digite o CEP"
        keyboardType="numeric"
        maxLength={8}
        value={cep}
        onChangeText={setCep}
      />
      <TouchableOpacity
        className="mt-4 bg-blue-500 p-3 rounded-xl w-72 items-center"
        onPress={buscarCEP}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-white text-lg">Buscar</Text>}
      </TouchableOpacity>
      {error ? <Text className="text-red-500 mt-2">{error}</Text> : null}
      {dados && (
        <View className="mt-6 p-4 w-72 bg-white rounded-xl shadow-md">
          <Text className="text-lg font-semibold">Endereço:</Text>
          <Text className="text-gray-700">{dados.logradouro}, {dados.bairro}</Text>
          <Text className="text-gray-700">{dados.localidade} - {dados.uf}</Text>
          <Text className="text-gray-700">CEP: {dados.cep}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
