import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

const Mural = () => {
  const [papeis, setPapeis] = useState([]);

  const [corEscolhida, setCorEscolhida] = useState("white");
  const [fonteEscolhida, setFonteEscolhida] = useState("Arial");

  const getPostIts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/postit");
      setPapeis(response.data);
    } catch (error) {
      console.error("Erro ao obter.", error);
    }
  };

  useEffect(() => {
    getPostIts();
  }, []);

  const [adicionando, setAdicionando] = useState(false);

  const toggleAdicionando = () => {
    setAdicionando(!adicionando);
  };

  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");

  const postPostIt = async () => {
    if (!titulo || !conteudo) {
      window.alert("Preencha todos os campos.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/postit", {
        titulo: titulo,
        conteudo: conteudo,
        backgroundColor: corEscolhida,
        fontFamily: fonteEscolhida,
      });
      getPostIts();
      toggleAdicionando();
      setTitulo("");
      setConteudo("");
      setCorEscolhida("white");
      setFonteEscolhida("Arial");
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const fecharNovoPostIt = () => {
    toggleAdicionando();
    setTitulo("");
    setConteudo("");
    setCorEscolhida("white");
    setFonteEscolhida("Arial");
  };

  const [escolhendoCor, setEscolhendoCor] = useState(false);

  const toggleEscolhendoCor = () => {
    setEscolhendoCor(!escolhendoCor);
  };

  const btnBranco = () => {
    setCorEscolhida("white");
    toggleEscolhendoCor();
  };

  const btnVermelho = () => {
    setCorEscolhida("#fc6f6f");
    toggleEscolhendoCor();
  };

  const btnAmarelo = () => {
    setCorEscolhida("#fcf86f");
    toggleEscolhendoCor();
  };

  const btnLaranja = () => {
    setCorEscolhida("orange");
    toggleEscolhendoCor();
  };

  const btnAzul = () => {
    setCorEscolhida("#6fa5fc");
    toggleEscolhendoCor();
  };

  const btnVerde = () => {
    setCorEscolhida("#7bfc6f");
    toggleEscolhendoCor();
  };

  const btnRosa = () => {
    setCorEscolhida("pink");
    toggleEscolhendoCor();
  };

  const btnRoxo = () => {
    setCorEscolhida("#d46ffc");
    toggleEscolhendoCor();
  };

  const [escolhendoFonte, setEscolhendoFonte] = useState(false);

  const toggleEscolhendoFonte = () => {
    setEscolhendoFonte(!escolhendoFonte);
  };

  return (
    <View style={styles.container}>
      <View style={styles.quadroPtMarrom}>
        <ScrollView style={styles.quadroPtVerde}>
          <Text style={styles.cabecalho}>Mural de post-it</Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {papeis.map((papel) => (
              <View
                key={papel.id}
                value={papel.id}
                style={{
                  ...styles.postIt,
                  backgroundColor: papel.backgroundColor,
                }}
              >
                <Image
                  source={require("./assets/pin.png")}
                  style={{
                    height: 40,
                    width: 40,
                    marginBottom: 10,
                    marginTop: 10,
                  }}
                />
                <Text style={{...styles.titulo, fontFamily: papel.fontFamily}}>{papel.titulo}</Text>
                <Text style={{...styles.conteudo, fontFamily: papel.fontFamily}}>{papel.conteudo}</Text>
              </View>
            ))}
            {adicionando == false && (
              <Pressable onPress={toggleAdicionando}>
                <FontAwesome
                  name="plus"
                  size={40}
                  color={"black"}
                  style={styles.addPostItBtn}
                />
              </Pressable>
            )}
            {adicionando && (
              <View
                style={{
                  ...styles.postIt,
                  backgroundColor: corEscolhida,
                  fontFamily: fonteEscolhida,
                }}
              >
                {escolhendoCor == false && escolhendoFonte == false && (
                  <View
                    style={{
                      height: "100%",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <TextInput
                      style={{
                        ...styles.titulo,
                        width: "95%",
                        fontFamily: fonteEscolhida,
                      }}
                      placeholder="Título (máx. 30)"
                      placeholderTextColor={"gray"}
                      multiline
                      numberOfLines={2}
                      maxLength={30}
                      value={titulo}
                      onChangeText={(text) => setTitulo(text)}
                    />
                    <TextInput
                      style={{
                        ...styles.conteudo,
                        width: "95%",
                        fontFamily: fonteEscolhida,
                      }}
                      placeholder="Conteúdo (máx. 150)"
                      placeholderTextColor={"gray"}
                      multiline
                      numberOfLines={6}
                      maxLength={150}
                      value={conteudo}
                      onChangeText={(text) => setConteudo(text)}
                    />
                    <Pressable
                      style={styles.cancelarNovo}
                      onPress={fecharNovoPostIt}
                    >
                      <FontAwesome name="times" size={30} color={"black"} />
                    </Pressable>
                    <Pressable
                      style={styles.fonteBtn}
                      onPress={toggleEscolhendoFonte}
                    >
                      <FontAwesome name="font" size={30} color={"black"} />
                    </Pressable>
                    <Pressable
                      style={styles.corBtn}
                      onPress={toggleEscolhendoCor}
                    >
                      <FontAwesome name="tint" size={30} color={"black"} />
                    </Pressable>
                    <Pressable style={styles.postar} onPress={postPostIt}>
                      <FontAwesome name="check" size={30} color={"black"} />
                    </Pressable>
                  </View>
                )}
                {escolhendoCor && (
                  <View
                    style={{
                      height: "100%",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 24, marginBottom: 20 }}>
                      Escolha uma cor
                    </Text>
                    <View style={styles.opcoesCor}>
                      <Pressable
                        style={{
                          ...styles.quadroCor,
                          backgroundColor: "white",
                        }}
                        onPress={btnBranco}
                      />
                      <Pressable
                        style={{
                          ...styles.quadroCor,
                          backgroundColor: "#fc6f6f",
                        }}
                        onPress={btnVermelho}
                      />
                      <Pressable
                        style={{
                          ...styles.quadroCor,
                          backgroundColor: "#fcf86f",
                        }}
                        onPress={btnAmarelo}
                      />
                      <Pressable
                        style={{
                          ...styles.quadroCor,
                          backgroundColor: "orange",
                        }}
                        onPress={btnLaranja}
                      />
                      <Pressable
                        style={{
                          ...styles.quadroCor,
                          backgroundColor: "#6fa5fc",
                        }}
                        onPress={btnAzul}
                      />
                      <Pressable
                        style={{
                          ...styles.quadroCor,
                          backgroundColor: "#7bfc6f",
                        }}
                        onPress={btnVerde}
                      />
                      <Pressable
                        style={{ ...styles.quadroCor, backgroundColor: "pink" }}
                        onPress={btnRosa}
                      />
                      <Pressable
                        style={{
                          ...styles.quadroCor,
                          backgroundColor: "#d46ffc",
                        }}
                        onPress={btnRoxo}
                      />
                    </View>
                  </View>
                )}
                {escolhendoFonte && (
                  <View
                    style={{
                      height: "100%",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 24, marginBottom: 20 }}>
                      Escolha uma fonte
                    </Text>
                    <Picker
                      selectedValue={fonteEscolhida}
                      onValueChange={(itemValue, itemIndex) =>
                        setFonteEscolhida(itemValue)
                      }
                      style={{ fontSize: 20 }}
                    >
                      <Picker.Item
                        label="Arial"
                        value="Arial"
                        style={{ fontFamily: "Arial" }}
                      />
                      <Picker.Item
                        label="Verdana"
                        value="Verdana"
                        style={{ fontFamily: "Verdana" }}
                      />
                      <Picker.Item
                        label="Helvetica"
                        value="Helvetica"
                        style={{ fontFamily: "Helvetica" }}
                      />
                      <Picker.Item
                        label="Times New Roman"
                        value="Times New Roman"
                        style={{ fontFamily: "Times New Roman" }}
                      />
                      <Picker.Item
                        label="Georgia"
                        value="Georgia"
                        style={{ fontFamily: "Georgia" }}
                      />
                      <Picker.Item
                        label="Courier New"
                        value="Courier New"
                        style={{ fontFamily: "Courier New" }}
                      />
                      <Picker.Item
                        label="Trebuchet MS"
                        value="Trebuchet MS"
                        style={{ fontFamily: "Trebuchet MS" }}
                      />
                      <Picker.Item
                        label="Comic Sans MS"
                        value="Comic Sans MS"
                        style={{ fontFamily: "Comic Sans MS" }}
                      />
                    </Picker>
                    <Pressable
                      style={{ marginTop: 20 }}
                      onPress={toggleEscolhendoFonte}
                    >
                      <FontAwesome name="check" size={30} color={"gray"} />
                    </Pressable>
                  </View>
                )}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",
  },
  quadroPtMarrom: {
    height: "95%",
    width: "98%",
    margin: "1%",
    backgroundColor: "brown",
  },
  quadroPtVerde: {
    height: "95%",
    width: "98%",
    margin: "1%",
    backgroundColor: "green",
  },
  postIt: {
    height: 290,
    width: 260,
    margin: 10,
    alignItems: "center",
  },
  titulo: {
    fontSize: 24,
    borderBottomWidth: 2,
    width: "90%",
    textAlign: "center",
    padding: 5,
  },
  conteudo: {
    fontSize: 18,
    textAlign: "center",
    padding: 5,
  },
  addPostItBtn: {
    padding: 10,
    borderRadius: 100,
    backgroundColor: "white",
    borderWidth: 2,
    marginTop: 115,
  },
  cabecalho: {
    fontSize: 40,
    color: "white",
    textAlign: "center",
    fontFamily: "Comic Sans MS",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    padding: 5,
    margin: 10,
  },
  postar: {
    alignSelf: "flex-end",
    bottom: 10,
    right: 10,
    position: "absolute",
  },
  fonteBtn: {
    alignSelf: "flex-end",
    bottom: 10,
    right: 60,
    position: "absolute",
  },
  corBtn: {
    alignSelf: "flex-end",
    bottom: 10,
    right: 110,
    position: "absolute",
  },
  cancelarNovo: {
    alignSelf: "flex-end",
    bottom: 10,
    left: 10,
    position: "absolute",
  },
  opcoesCor: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  quadroCor: {
    width: 50,
    height: 50,
    borderWidth: 2,
    margin: 5,
  },
});

export default Mural;
