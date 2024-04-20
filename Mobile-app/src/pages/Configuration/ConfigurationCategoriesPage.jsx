import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card, Chip, TextInput, Portal } from 'react-native-paper';

import CustomModal, { customModalStyles } from '../../components/CustomModal';
import FloatButton from '../../components/FloatButton';
import { generalStyles, getColors, getComponentsColors } from '../../generalStyles';
import { useCategoriesContext } from '../../providers/CategoriesProvider';
import { useFunctionProvider } from '../../providers/FunctionsProvider';
import { NOTIFICATION_TYPE, useNotificationProvider } from '../../providers/NotificationProvider';

const { category_chip_background, category_chip_text_color } = getComponentsColors();

function ConfigurationCategoriesPage({ route }) {
  const { categoryType } = route.params;
  const { categories, deleteCategory, categoryDispatch } = useCategoriesContext();
  const { capitalizeFirstLetter } = useFunctionProvider();
  const { setSnackBarContent, showSnackbar } = useNotificationProvider();

  // Add categories states
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  // Delete categories states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(
    /** @type {categoryObject | undefined} */ (undefined)
  );

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

    categoryDispatch({
      type: 'add_category',
      cat: formattedNewCategory,
      categoryType,
    });

    setSnackBarContent({
      text: 'Category successfully added',
      type: NOTIFICATION_TYPE.OK,
    });
    showSnackbar();

    setNewCategory('');
    setShowAddCategoryModal(false);
  };

  /**
   * Muestra el modal para eliminar una categoría
   * @param {categoryObject} cat Category
   */
  const viewRemoveModal = (cat) => {
    setShowDeleteModal(true);
    setCategoryToDelete(cat);
  };

  /**
   * Elimina la categoría seleccionada en categoryToDelete
   */
  const onRemoveCategory = () => {
    if (categoryToDelete) {
      deleteCategory(categoryToDelete);

      setCategoryToDelete(undefined);
      setShowDeleteModal(false);

      setSnackBarContent({ text: 'Category correctly deleted', type: NOTIFICATION_TYPE.OK });
      showSnackbar();
    }
  };

  return (
    <>
      <ScrollView>
        <View style={generalStyles.container}>
          <Card style={generalStyles.card}>
            {/* Title */}
            <Text style={styles.titleContainer}>
              <Text style={{ ...generalStyles.textTitle, flex: 1 }}>
                {capitalizeFirstLetter(categoryType)} categories
              </Text>
            </Text>

            {/* View categories */}
            <View style={styles.chipContainer}>
              {categories.map((item, index) => {
                return (
                  item.type === categoryType && (
                    <Chip
                      key={index}
                      onClose={() => viewRemoveModal(item)}
                      style={styles.chipStyle}
                      textStyle={{ color: category_chip_text_color }}
                    >
                      {item.cat}
                    </Chip>
                  )
                );
              })}
            </View>
          </Card>
        </View>
      </ScrollView>

      {/* Add Button */}
      <FloatButton onPress={viewAddModal} />

      <Portal>
        {/* Add Category Modal */}
        <CustomModal
          isVisible={showAddCategoryModal}
          onAccept={onAddCategory}
          hideModal={() => setShowAddCategoryModal(false)}
          onCancel={() => setShowAddCategoryModal(false)}
        >
          <Text style={customModalStyles.modalTitle}>Add {categoryType} category</Text>
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
            {categoryToDelete && categoryToDelete.cat}
          </Text>
        </CustomModal>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderBottomColor: getColors().lightGray,
    borderBottomWidth: 2,
    paddingBottom: 20,
    marginBottom: 20,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginVertical: 20,
  },
  chipStyle: {
    backgroundColor: category_chip_background,
    color: category_chip_text_color,
  },
});

export default ConfigurationCategoriesPage;
