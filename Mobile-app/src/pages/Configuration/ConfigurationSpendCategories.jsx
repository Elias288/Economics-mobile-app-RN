import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card, Chip, TextInput } from 'react-native-paper';

import CustomModal, { customModalStyles } from '../../components/CustomModal';
import FloatButton from '../../components/FloatButton';
import { generalStyles } from '../../generalStyles';
import { MOVEMENTTYPE } from '../../hooks/useMovements';
import { useAmountContext } from '../../providers/amountProvider';

function ConfigurationSpendCategories() {
  const { spendCategories, addCategory, deleteCategory } = useAmountContext();

  const [categories, setCategories] = useState(/** @type {Array<String>} */ ([]));
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState('');

  useEffect(() => {
    setCategories(spendCategories.map((spend) => spend.cat));
  }, [spendCategories]);

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
    if (formattedNewCategory === '' || formattedNewCategory.length < 4)
      return alert('Invalid Category');

    addCategory(formattedNewCategory, MOVEMENTTYPE.SPEND);

    setNewCategory('');
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
    deleteCategory(categoryToDelete, MOVEMENTTYPE.SPEND);

    setCategoryToDelete('');
    setShowDeleteModal(false);
  };

  return (
    <>
      <ScrollView>
        <View style={generalStyles.container}>
          <Card style={generalStyles.card}>
            <Text style={generalStyles.textTitle}>Spends categories</Text>

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
      <FloatButton onPress={viewAddModal} />

      {/* Add Category Modal */}
      <CustomModal
        isVisible={showAddCategoryModal}
        onAccept={onAddCategory}
        hideModal={() => setShowAddCategoryModal(false)}
        onCancel={() => setShowAddCategoryModal(false)}
      >
        <Text style={customModalStyles.modalTitle}>Add Category</Text>
        <TextInput
          autoFocus
          label="Category"
          onChangeText={(text) => setNewCategory(text)}
          value={newCategory}
        />
      </CustomModal>

      {/* Delete Category Modal */}
      <CustomModal
        isVisible={showDeleteModal}
        onAccept={onRemoveCategory}
        onCancel={() => setShowDeleteModal(false)}
        hideModal={() => setShowDeleteModal(false)}
      >
        <Text style={customModalStyles.modalMessage}>
          Are you sure you want to remove this category?
        </Text>
        <Text
          style={{
            ...customModalStyles.modalMessage,
            fontWeight: 'bold',
            textAlign: 'center',
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginVertical: 20,
  },
});

export default ConfigurationSpendCategories;
