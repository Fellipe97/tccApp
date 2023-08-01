import React from 'react';
import { Center, VStack, Text, View } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '@components/Header';
import { Button } from '@components/Button';

export function SignUp() {
  const navigation = useNavigation();
  const gifSource = require('../assets/signUpGIF.gif');

  function handleGoBack() {
    navigation.goBack();
  }

  const steps = [
    {
      title: 'DOCUMENTOS',
      text: 'Separe os documentos necessãrios (RG, CPF e comprovante de resitência) do responsável e do(s) estudante(s)',
    },
    {
      title: 'LOCOMOÇÃO',
      text: 'Pegue todos os documentos separados e diriga-se ao colégio',
    },
    {
      title: 'SECRETARIA',
      text: 'Informe ao atendente que dejesa realizar o cadastro do login para utilizar o aplicativo. Entregue os documentos para o atendente na secretaria.',
    },
    {
      title: 'VALIDAÇÃO',
      text: 'Aguarde a confirmação do registro do cadastro. Essa etapa pode demorar alguns dias (segundo informado na secretaria).',
    },
    {
      title: 'ACESSO',
      text: 'Chegará em seu email cadastrado uma senha temporária que deverá ser alterada ao realizar o primeiro login.',
    },
  ];

  return (
    <VStack mt={1} flex={1}>
      <Header title="PRIMEIRO ACESSO" buttonBack={false} />
      <VStack mt={2} justifyContent={'center'} px={12} flex={1} w={'100%'}>
        {/* Mapear os passos e renderizar os títulos e texto */}
        {steps.map((step, index) => (
          <VStack key={index}>
            <Center>
              <Text fontFamily={'heading'} fontSize={'lg'}>
                {step.title}
              </Text>
            </Center>
            <VStack>
              <Text
                textAlign={'center'}
                fontFamily={'body'}
                fontSize={'sm'}
                numberOfLines={40}
              >
                {step.text}
              </Text>
            </VStack>
            {index < steps.length - 1 && (
              <VStack w={'100%'} alignItems={'center'} mt={2}>
                <View style={{ transform: [{ rotate: '-90deg' }] }}>
                  <Ionicons name="md-arrow-undo-sharp" size={24} color="#8257E6" />
                </View>
              </VStack>
            )}
          </VStack>
        ))}
      </VStack>

      <VStack px={12} mb={7}>
        <Button mt={4} title="Voltar" onPress={handleGoBack} />
      </VStack>
    </VStack>
  );
}
