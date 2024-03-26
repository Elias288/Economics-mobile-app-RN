import { useState } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { Card, Chip, TextInput } from "react-native-paper";
import generalStyles from "../../generalStyles";
import FloatButton from "../../components/FloatButton";
import CustomModal, { customModalStyles } from "../../components/CustomModal";

const categoriesDefault = ["Ahorro", "Sueldo", "Bonificaciones", "Intereses"];

function ConfigurationIncomeCategories() {
  const [categories, setCategories] = useState(
    /** @type {Array<String>} */ (categoriesDefault)
  );
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState("");

  /**
   * Muestra el modal para agregar una categoría
   */
  const viewAddModal = () => {
    setShowAddCategoryModal(true);
  };

  /**
   * Agrega la categoría creada a la lista
   * @returns {void}
   */
  const onAddCategory = () => {
    const formattedNewCategory = newCategory.trim();
    if (formattedNewCategory === "" || formattedNewCategory.length < 4)
      return alert("Invalid Category");

    // alert(newCategory);
    setCategories([...categories, formattedNewCategory]);
    setNewCategory("");
    setShowAddCategoryModal(false);
  };

  /**
   * Muestra el modal para eliminar una categoría
   * @param {string} cat Category
   */
  const viewRemoveModal = (cat) => {
    setShowDeleteModal(true);
    setCategoryToDelete(cat);
  };

  /**
   * Elimina la categoría seleccionada en categoryToDelete
   */
  const onRemoveCategory = () => {
    setCategories(categories.filter((cat) => cat !== categoryToDelete));
    setCategoryToDelete("");
    setShowDeleteModal(false);
  };

  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <View style={generalStyles.container}>
          <Card style={generalStyles.card}>
            <Text style={generalStyles.textTitle}>Income categories</Text>

            <View style={styles.chipContainer}>
              {categories.map((item, index) => (
                <Chip key={index} onClose={() => viewRemoveModal(item)}>
                  {item}
                </Chip>
              ))}
            </View>
          </Card>
        </View>
      </ScrollView>

      {/* Add Button */}
      <FloatButton action={viewAddModal} />

      {/* Add Category Modal */}
      <CustomModal
        isVisible={showAddCategoryModal}
        onAceptar={onAddCategory}
        hideModal={() => setShowAddCategoryModal(false)}
        onCancelar={() => setShowAddCategoryModal(false)}
      >
        <Text style={customModalStyles.modalTitle}>Add Category</Text>
        <TextInput
          label={"Category"}
          onChangeText={(text) => setNewCategory(text)}
          value={newCategory}
        />
      </CustomModal>

      {/* Delete Category Modal */}
      <CustomModal
        isVisible={showDeleteModal}
        onAceptar={onRemoveCategory}
        onCancelar={() => setShowDeleteModal(false)}
        hideModal={() => setShowDeleteModal(false)}
      >
        <Text style={customModalStyles.modalMessage}>
          Are you sure you want to remove this category?
        </Text>
        <Text
          style={{
            ...customModalStyles.modalMessage,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {categoryToDelete}
        </Text>
      </CustomModal>
    </>
  );
}

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginVertical: 20,
  },
});

export default ConfigurationIncomeCategories;
